let courseCollection;
let numPlayers = 1;
let counter = 1;
let id = 0;
let deleteSwitch = 0;
let parIn = 0;
let parOut = 0;
let yardsIn = 0;
let yardsOut = 0;


(function(){
    loadDoc();
})();

function loadDoc(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            courseCollection = JSON.parse(this.responseText);

            for(let i = 0; i < courseCollection.courses.length; i++){
                $("#courseSelect").append("<option value='" + courseCollection.courses[i].id + "'>"+ courseCollection.courses[i].name +"</option>");
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/", true);
    xhttp.send();
}
function loadCourse(courseid){
    id = courseid;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let mycourse = JSON.parse(this.responseText);
            let teeArray = mycourse.data.holes[0].teeBoxes;
            $("#teeSelect").html("<option value='' selected hidden>Choose Tee</option>\n");
            for(let i = 0; i < teeArray.length; i++){
                $("#teeSelect").append("<option value='" + i + "'>" + teeArray[i].teeType + "</option>");
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + courseid, true);
    xhttp.send();
}
function chooseTee(tee){
    parIn = 0;
    parOut = 0;
    yardsIn = 0;
    yardsOut = 0;
    $(".yards th").remove();
    $(".par th").remove();
    $(".handicap th").remove();
    $(".hole th").remove();
    $(".player tr").remove();
    $(".buttons button").remove();
    buildCard(tee);
}
function buildCard(tee){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let mycourse = JSON.parse(this.responseText);
            //yards
            $(".yards").append("<th scope='col'>Yards</th>\n");
            for(let i = 0; i < 9; i++){
                let yards = mycourse.data.holes[i].teeBoxes[tee].yards;
                $(".yards").append("<th scope='col' class='labelNum'>"+ yards +"</th>");
                yardsIn += yards;
            }
            $(".yards").append("<th scope='col' class='in'>"+ yardsIn +"</th>");
            for(let i = 9; i < 18; i++){
                let yards = mycourse.data.holes[i].teeBoxes[tee].yards;
                $(".yards").append("<th scope='col' class='labelNum'>"+ yards +"</th>");
                yardsOut += yards;
            }
            $(".yards").append("<th scope='col' class='in'>"+ yardsOut +"</th>");
            $(".yards").append("<th scope='col' class='total'>"+ (yardsIn + yardsOut) +"</th>");

            //par
            $(".par").append("<th scope='col'>Par</th>");
            for(let i = 0; i < 9; i++){
                let par = mycourse.data.holes[i].teeBoxes[tee].par;
                $(".par").append("<th scope='col' class='labelNum'>"+ par +"</th>");
                parIn += par;
            }
            $(".par").append("<th scope='col' class='in'>"+ parIn +"</th>");
            for(let i = 9; i < 18; i++){
                let par = mycourse.data.holes[i].teeBoxes[tee].par;
                $(".par").append("<th scope='col' class='labelNum'>"+ par +"</th>");
                parOut += par;
            }
            $(".par").append("<th scope='col' class='in'>"+ parOut +"</th>");
            $(".par").append("<th scope='col' class='total'>"+ (parIn + parOut) +"</th>");

            //handicap
            $(".handicap").append("<th scope='col'>Handicap</th>");
            for(let i = 0; i < 9; i++){
                let hcp = mycourse.data.holes[i].teeBoxes[tee].hcp;
                $(".handicap").append("<th scope='col' class='labelNum'>"+ hcp +"</th>");
            }
            $(".handicap").append("<th scope='col' class='in'></th>");
            for(let i = 9; i < 18; i++){
                let hcp = mycourse.data.holes[i].teeBoxes[tee].hcp;
                $(".handicap").append("<th scope='col' class='labelNum'>"+ hcp +"</th>");
            }
            $(".handicap").append("<th scope='col' class='in'></th>");
            $(".handicap").append("<th scope='col' class='total'></th>");

            //hole
            $(".hole").append("<th scope='col'>Hole</th>");
            for(let i = 1; i < 10; i++){
                $(".hole").append("<th scope='col' class='labelNum'>"+ i +"</th>");
            }
            $('.hole').append("<th scope='col' class='in'>In</th>");
            for(let i = 10; i < 19; i++){
                $(".hole").append("<th scope='col' class='labelNum'>"+ i +"</th>");
            }
            $('.hole').append("<th scope='col' class='out'>Out</th>\n" +
                "              <th scope='col' class='total'>Total</th>\n" +
                "              <th scope='col' class='relScore'>Score</th>");

            //player1
            addPlayer();
            $(".buttons").append("<button onclick='addPlayer()'>Add Another Player</button>\n" +
                "    <button class='edit' onclick='deleteToggle()'>Edit Players</button>");
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + id, true);
    xhttp.send();
}

function addPlayer() {
    $(".table").append("<tbody class='player'>\n" +
        "        <tr class='player"+ counter +"'>\n" +
        "            <td class='name'><input placeholder='Name'></td>\n"+
        "        </tr>\n" +
        "    </tbody>");
    let player = ".player" + counter;
    for(let i = 1; i < 10; i++){
        $(`${player}`).append("<td class='scoreBox'><input class='scoreInput p"+ counter +"h"+ i +"'></td>");
    }
    $(player).append("<td class='inScore'>0</td>");
    for(let i = 10; i < 19; i++){
        $(".player" + counter).append("<td class='scoreBox'><input class='scoreInput p"+ counter +"h"+ i +"'></td>");
    }
    $(player).append("<td class='outScore'></td>" +
        "<td class='totalScore total'>0</td>"+
        "<td class='relTotal relScore'>0</td>\n");
    counter++;
    numPlayers++;
    $("input").keyup(function(event){
        getScores()
    });
}

function deleteToggle(){
    if(deleteSwitch === 0) {
        $(".name").append("<i class='fas fa-times-circle' onclick='deletePlayer(this)'></i>");
        $(".edit").html("Stop Editing");
        deleteSwitch = 1;
    }
    else{
        $(".name i").remove();
        deleteSwitch = 0;
        $(".edit").html("Edit Players");
    }
    // addEventListener("click", $(".player").remove());
}


function deletePlayer(element){
    $(element).parent().parent().remove();
}

$("input").keyup(function(event){
    getScores();
});

function getScores(){
    for(let player = 1; player < numPlayers + 1; player++){
        let inScore = 0;
        let outScore = 0;
        for(let hole = 1; hole < 10; hole++){
            let playerId = ".p" + player + "h" + hole;
            let num = $(playerId).val();
            inScore += Number(num);
        }
        for(let hole = 10; hole < 19; hole++){
            let playerId = ".p" + player + "h" + hole;
            outScore += Number($(playerId).val());
        }
        let totalScore = inScore + outScore;
        let whichPlayer = ".player" + player;
        $(`${whichPlayer} .inScore`).html(inScore);
        $(`${whichPlayer} .outScore`).html(outScore);
        $(`${whichPlayer} .totalScore`).html(totalScore);
        $(`${whichPlayer} .relScore`).html(totalScore - (parIn + parOut));
    }
}



