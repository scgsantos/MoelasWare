"""
Requires the `requests` and `matplotlib` modules to run.
Install them with pip, like this: `pip install -U requests matplotlib`

Write your access token to a file named `.timegraphtoken`

How to use:
    python time_tracking.py <group> <sprint>
Example:
    python time_tracking.py 1 3
    (make graph for group 1's workload during sprint 3)
"""
import datetime
import argparse
import itertools

import matplotlib.pyplot as plt
import requests

PROJECT_ID = 39332768
BASE_URL = "https://gitlab.com/api/v4"
REQUEST_URL = f"{BASE_URL}/projects/{PROJECT_ID}/issues"
TOKEN_FILENAME = ".timegraphtoken"
GROUPS = [
    {
        "bruno.r.sebastiao": "Bruno Sebastião",
        "OriginalNameTag": "Carlos Jordão",
        "DuarteFonte_Santa": "Duarte Fonte-Santa",
        "miguelfdas": "Miguel Sérgio",
        "Nunoduarte1": "Nuno Gomes",
        "Pedro-Cardoso7": "Pedro Cardoso",
        "rodrigoofig": "Rodrigo Figueiredo",
    },
    {
        "acolaco30": "André Colaço",
        "DanielaCosta": "Daniela Costa",
        "GamingBound": "João Leite",
        "larasilveiraluz2021": "Lara Luz",
        "sofiaTrindade": "Sofia Trindade",
        "tomasduarte": "Tomás Duarte",
    },
    {
        "CarlosMOMatos": "Carlos Matos",
        "iTzHuGo": "Hugo Barros",
        "mmagueijo": "Mariana Magueijo",
        "ertem0": "Vasco Goveia",
        "aritaoliveira": "Rita Oliveira",
        "joaopino": "João Pino",
    },
    {
        "Elenanni": "Elena Barrera",
        "loboh67": "Henrique Lobo",
        "josessilva28": "José Silva",
        "LeomPina": "Leonardo Pina",
        "ThunderStorm710": "Pedro Ascensão",
        "rafa_74": "Rafael Ferreira",
        "scgsantos": "Sofia Santos",
    },
    {
        "af0nso_duarte": "Afonso Duarte",
        "itsdanielalopes": "Daniela Lopes",
        "PolpEdu": "Eduardo Nunes",
        "GuilhermeFFaria": "Guilherme Faria",
        "mariislvs": "Mariana Silva",
        "miguelopesantana": "Miguel Santana",
    },
]


def parse_args():
    parser = argparse.ArgumentParser(
        description="Grab time tracking info from GitLab and plot it"
    )
    parser.add_argument("group", default=None, help="The target group number")
    parser.add_argument("sprint", default=None, help="The target sprint number")

    args = parser.parse_args()
    # quick and dirty
    args.group = None if args.group.casefold() == "all" else int(args.group)
    args.sprint = None if args.sprint.casefold() == "all" else f"Sprint {int(args.sprint)}"

    return args


def read_gitlab_token():
    try:
        with open(TOKEN_FILENAME) as fp:
            return fp.read().strip()
    except FileNotFoundError:
        print(
            f"Couldn't find {TOKEN_FILENAME} file! "
            "Make sure it exists and contains your access token."
        )
        exit(1)


def format_timedelta(delta):
    hours, rem = divmod(delta.seconds, 3600)
    minutes, seconds = divmod(rem, 60)
    hours += delta.days * 24
    return f"{hours:02}:{minutes:02}:{seconds:02}"


def time_tracking(token, user, milestone):
    print(f"Requesting info for {user[1]} ({user[0]})")
    total_time = 0
    params = {"assignee_username": user[0], "per_page": 100}
    if milestone is not None:
        params["milestone"] = milestone
    request = requests.get(
        REQUEST_URL,
        headers={"Private-Token": token},
        params=params,
    )
    request.raise_for_status()

    issues = {issue["title"]: issue["time_stats"] for issue in request.json()}
    time_values = issues.values()
    for v in time_values:
        total_time += v.get("total_time_spent")

    return datetime.timedelta(seconds=total_time)


def run():
    args = parse_args()
    token = read_gitlab_token()

    milestone = args.sprint
    # flatten groups if "all"
    group = {k: v for k, v in itertools.chain.from_iterable(i.items() for i in GROUPS)} if args.group is None else GROUPS[args.group - 1]
    title = f"Time Tracking - {milestone or 'All'} - Group {args.group or 'All'}"
    total_time_list = []
    results = []

    for user in group.items():
        delta = time_tracking(token, user, milestone)
        total_time_list.append(delta.total_seconds() / 3600)
        results.append(format_timedelta(delta))

    print("Building graph")
    fig = plt.figure(figsize=(10, 5))

    plt.figure(1)
    plt.bar([n.replace(" ", "\n") for n in group.values()], total_time_list)

    plt.ylabel("Total Time (Hours)")
    plt.title(title)
    for i, _ in enumerate(group):
        plt.text(i - 0.25, 2, results[i])

    fig.savefig(
        f"{title}.svg",
        bbox_inches="tight",
        dpi=150,
    )
    plt.show()


if __name__ == "__main__":
    run()
