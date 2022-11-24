import glob
import fnmatch

import nox

def filter(l, p):
    return set(l) - set(fnmatch.filter(l, p))

S = nox.Session

ALL_BACKEND_CODE = glob.iglob("dev/backend/**/*.py", recursive=True)
ALL_BACKEND_CODE = filter(ALL_BACKEND_CODE, "*venv*")
ALL_BACKEND_CODE = filter(ALL_BACKEND_CODE, "*manage.py")
ALL_BACKEND_CODE = filter(ALL_BACKEND_CODE, "*populate_db.py")
ALL_BACKEND_CODE = filter(ALL_BACKEND_CODE, "*migrations*")

nox.options.reuse_existing_virtualenvs = True

PYTHON_VERSION = "3.10"

LINT_STAGE = "lint"
COVERAGE_STAGE = "coverage"
TEST_STAGE = "test"
DEPLOY_STAGE = "deploy"

BLACK = "black"
ISORT = "isort"
VULTURE = "vulture"
FLAKE = "flake8"
PYLINT = "pylint"
PYLINT_DJANGO = "pylint-django"
PROSPECTOR = "prospector"
BANDIT = "bandit"
RADON = "radon"
COVERAGE = "coverage"
PYTEST = "pytest"

REQUIREMENTS_TXT = "dev/backend/requirements.txt"
PYTEST_PATH = "dev/backend/api/tests.py"

U = "-U"
R = "-r"
EXIT_ZERO = "--exit-zero"
ZERO_EXIT = "--zero-exit"
DEADCODE_MIN_CONFIDENCE = "80"


@nox.session(tags=[LINT_STAGE], python=PYTHON_VERSION)
def format(s: S):
    s.install(U, BLACK, ISORT)
    s.run(BLACK, *ALL_BACKEND_CODE)
    s.run(ISORT, *ALL_BACKEND_CODE)


@nox.session(tags=[LINT_STAGE], python=PYTHON_VERSION)
def deadcode(s: S):
    s.install(U, VULTURE)
    s.run(
        VULTURE,
        "--min-confidence",
        DEADCODE_MIN_CONFIDENCE,
        *ALL_BACKEND_CODE,
        success_codes=[0, 1]
    )


@nox.session(tags=[LINT_STAGE], python=PYTHON_VERSION)
def lint(s: S):
    s.install(U, PROSPECTOR+"==1.7.7", R, REQUIREMENTS_TXT)  # need to pin that version for some reason
    s.run(PROSPECTOR, ZERO_EXIT, *ALL_BACKEND_CODE, env={"DJANGO_SETTINGS_MODULE": "moelasware.settings"})


@nox.session(tags=[LINT_STAGE], python=PYTHON_VERSION)
def security(s: S):
    s.install(U, BANDIT)
    s.run(BANDIT, "-r", *ALL_BACKEND_CODE)


@nox.session(tags=[COVERAGE_STAGE], python=PYTHON_VERSION)
def metrics(s: S):
    s.install(U, RADON)
    print(" === RAW METRICS === ")
    s.run(RADON, "raw", *ALL_BACKEND_CODE)
    print(" === CYCLOMATIC COMPLEXITY === ")
    s.run(RADON, "cc", *ALL_BACKEND_CODE)
    print(" === MAINTAINABILITY INDEX === ")
    s.run(RADON, "mi", *ALL_BACKEND_CODE)
    print(" === HALSTEAD === ")
    s.run(RADON, "hal", *ALL_BACKEND_CODE)


@nox.session(tags=[COVERAGE_STAGE], python=PYTHON_VERSION)
def coverage(s: S):
    s.install(U, COVERAGE)
    s.run(COVERAGE, "report", "-m", *ALL_BACKEND_CODE)


@nox.session(tags=[TEST_STAGE], python=PYTHON_VERSION)
def test(s: S):
    s.install(U, PYTEST, R, REQUIREMENTS_TXT)
    s.run(PYTEST, PYTEST_PATH, success_codes=[0, 5], env={"DJANGO_SETTINGS_MODULE": "moelasware.settings"})


@nox.session(tags=[DEPLOY_STAGE], python=PYTHON_VERSION)
def deploy(s: S):
    return NotImplemented
