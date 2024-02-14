document.addEventListener('DOMContentLoaded', function() {
    const fetchActivityBtn = document.getElementById('fetchActivityBtn');
    fetchActivityBtn.addEventListener('click', function() {
        document.getElementById('activityDisplay').style.display = 'flex';
        fetchRandomActivities();
    });
});

function fetchRandomActivities() {
    const numActivities = 6;
    const apiUrl = `https://www.boredapi.com/api/activity?participants=1`;
    const promises = [];

    for (let i = 0; i < numActivities; i++) {
        promises.push(fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }));
    }

    Promise.all(promises)
        .then(dataArray => {
            console.log(dataArray);
            displayRandomActivities(dataArray);
        })
        .catch(error => {
            console.error('There was a problem with fetching activities:', error);
            displayError('Failed to fetch activities. Please try again later.');
        });
}

function displayRandomActivities(data) {
    for (let i = 0; i < data.length; i++) {
        const activity = data[i];
        const boxId = 'activity' + (i + 1);
        const box = document.getElementById(boxId);

        if (activity) {
            box.textContent = activity.activity;
        } else {
            box.textContent = "No activity available";
        }
    }
}

async function rerollActivity(activityNumber) {
    const apiUrl = `https://www.boredapi.com/api/activity?participants=1`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const activity = await response.json();
        const boxId = 'activity' + activityNumber;
        const box = document.getElementById(boxId);
        if (activity.activity) {
            box.textContent = activity.activity;
        } else {
            box.textContent = "No activity available";
        }
    } catch (error) {
        console.error('There was a problem with fetching activity:', error);
    }
}

function displayError(message) {
    document.getElementById('activity1').textContent = message;

    const boxIds = ['activity2', 'activity3', 'activity4', 'activity5', 'activity6'];
    for (let i = 0; i < boxIds.length; i++) {
        document.getElementById(boxIds[i]).textContent = '';
    }
}