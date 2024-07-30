// teamMembers holds the data of all the team members
const teamMembers = [
    {
        name: "Rumesa Nadeem",
        id: "100869723",
        email: "rumesa.nadeem@ontariotechu.net",
        github: ""
    },
    {
        name: "Sanhith Amarathunge",
        id: "100868227",
        email: "sanhith.amarathunge@ontariotechu.net",
        github: "https://github.com/xSanboyzx"
    },
    {
        name: "Rosie Khurmi",
        id: "100862409",
        email: "rosie.khurmi@ontariotechu.net",
        github: "https://github.com/rkhurmi"
    },
    {
        name: "Aryan Ved",
        id: "100866023",
        email: "aryan.ved@ontariotechu.net",
        github: "https://github.com/AryanVed1"
    },
];

// createTeamMember() populates HTML with team members
function createTeamMember(member) {

    // Create HTML Element
    let card = document.createElement('div');

    // Add elements of each team member to the HTML Element
    card.className = "column";
    card.innerHTML = `

        <div class="card">
            <div class="container">
                <h2>${member.name}</h2>
                <p class="title">${member.id}</p>
                <a href="mailto:${member.email}" class="email">${member.email}</a></p>
                <a href="${member.github}"><button class="button">GitHub</button></a>
            </div>    
        </div>`;

    // Allow users to copy email address
    card.querySelector('.email').addEventListener('click', function(event) {
        event.preventDefault();
        const email = event.target.textContent;
        navigator.clipboard.writeText(email).then(() => {
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    });

    // Return the card
    return card;
}

// addTeamMember() populates team members in about section
function addTeamMember() {
    // Create a new card for each team member
    let teamMembersContainer = document.getElementById('teamMembers');
    teamMembers.forEach(member => {
        let memberCard = createTeamMember(member);
        teamMembersContainer.appendChild(memberCard);
    });
}

addTeamMember();
