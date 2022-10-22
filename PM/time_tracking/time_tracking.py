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
import time
import argparse

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
        "af0onso_duarte": "Afonso Duarte",
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
    parser.add_argument("group", type=int, help="The target group number")
    parser.add_argument("sprint", type=int, help="The target sprint number")

    return parser.parse_args()


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


def time_tracking(token, user, milestone):
    print(f"Requesting info for {user[1]} ({user[0]})")
    total_time = 0
    request = requests.get(
        REQUEST_URL,
        headers={"Private-Token": token},
        params={"assignee_username": user[0], "milestone": milestone},
    )
    request.raise_for_status()

    issues = {issue["title"]: issue["time_stats"] for issue in request.json()}
    time_values = issues.values()
    for v in time_values:
        total_time += v.get("total_time_spent")

    # Convert to hours
    time_aux = time.gmtime(total_time)
    time_num = time_aux.tm_hour + time_aux.tm_min / 60
    return time.strftime("%H:%M:%S", time_aux), time_num


def run():
    args = parse_args()
    token = read_gitlab_token()

    milestone = f"Sprint {args.sprint}"
    group = GROUPS[args.group - 1]
    total_time_list = []
    results = []

    for user in group.items():
        time_str, time_num = time_tracking(token, user, milestone)
        total_time_list.append(time_num)
        results.append(time_str)

    print("Building graph")
    fig = plt.figure(figsize=(10, 5))

    plt.figure(1)
    plt.bar([n.replace(" ", "\n") for n in group.values()], total_time_list)

    plt.ylabel("Total Time (Hours)")
    plt.title(f"Time Tracking - {milestone} - Group {args.group}")
    for i, _ in enumerate(group):
        plt.text(i - 0.25, 2, results[i])

    fig.savefig(
        f"Time Tracking - {milestone} - Group {args.group}.svg",
        bbox_inches="tight",
        dpi=150,
    )
    plt.show()


if __name__ == "__main__":
    run()
