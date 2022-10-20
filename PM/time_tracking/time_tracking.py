import requests
import time
import matplotlib.pyplot as plt

access_token = ""  # Enter your API key here
project_id = 39332768
base_url = "https://gitlab.com/api/v4"
headers = {'Private-Token': access_token}


def time_tracking(username, milestone):
    total_time = 0

    request_url = f"{base_url}/projects/{project_id}/issues?assignee_username={username}&milestone={milestone}"

    project_request = requests.get(request_url, headers=headers)

    issues = {issue["title"]: issue["time_stats"] for issue in project_request.json()}
    time_values = issues.values()
    for v in time_values:
        total_time += v.get('total_time_spent')

    # Convert to hours
    time_aux = time.gmtime(total_time)
    time_num = time_aux.tm_hour + ((time_aux.tm_min*100)/60)/100
    return time.strftime("%H:%M:%S", time_aux), time_num


if __name__ == "__main__":
    milestone = "Sprint 3"
    group_2 = ['acolaco30', 'DanielaCosta', 'GamingBound', 'larasilveiraluz2021', 'sofiaTrindade', 'tomasduarte']
    names_n = ['André\nColaço', 'Daniela\nCosta', 'João\nLeite', 'Lara\nLuz', 'Sofia\nTrindade', 'Tomás\nDuarte']
    names = ['André Colaço', 'Daniela Costa', 'João Leite', 'Lara Luz', 'Sofia Trindade', 'Tomás Duarte']
    total_time_list = []
    results = []

    for i in range(len(group_2)):
        time_str, time_num = time_tracking(group_2[i], milestone)
        total_time_list.append(time_num)
        results.append(time_str)

    fig = plt.figure(figsize=(10, 5))

    plt.figure(1)
    plt.bar(names_n, total_time_list)
    plt.ylabel('Total Time (Hours)')
    plt.title('Time Tracking - ' + milestone + ' - Group 2')
    for i in range(len(group_2)):
        plt.text(i - 0.25, 2, results[i])

    fig.savefig('Time Tracking - ' + milestone + ' - Group 2.svg', bbox_inches='tight', dpi=150)
    plt.show()
