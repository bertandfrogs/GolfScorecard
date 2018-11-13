let courseCollection;
let numPlayers = 5;
let numHoles = 18;
let counter = 2;
let id;

(function(){
    loadDoc();
})();

function loadDoc(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            courseCollection = JSON.parse(this.responseText);
            console.log(courseCollection);

            for(let i = 0; i < courseCollection.courses.length; i++){
                $("#courseSelect").append("<option value='" + courseCollection.courses[i].id + "'>"+ courseCollection.courses[i].name +"</option>");
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/", true);
    xhttp.send();
}
function loadCourse(courseid){
    console.log(courseid);
    let id = courseid;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            let mycourse = JSON.parse(this.responseText);
            console.log(mycourse);
            let teeArray = mycourse.data.holes[0].teeBoxes;
            for(let i = 0; i < teeArray.length; i++){
                // $("#teeSelect").empty();
                $("#teeSelect").append("<option value='" + i + "'>" + teeArray[i].teeType + "</option>");
            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + courseid, true);
    xhttp.send();
}
function chooseTee(tee){
    console.log(tee);
    getYards(tee);
}
function getYards(tee){
    for(let hole = 0; hole < 9; hole++){
        // let xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function () {
        //     if(this.readyState === 4 && this.status === 200){
        //         let mycourse = JSON.parse(this.responseText);
        //         console.log(mycourse);
        //         let yards = mycourse.data.holes[hole].teeBoxes[tee].yards;
        //         console.log("Yards: " + yards);
        //         $(".yards").append("<th scope='col'>"+ yards +"</th>")
        //     }
        // };
        // xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + id, true);
        // xhttp.send();
        $(".yards").append("<th scope='col'>0</th>");
    }
    $(".yards").append("<th scope='col' class='in'></th>");
    for(let hole = 9; hole < 18; hole++){
        $(".yards").append("<th scope='col'>0</th>");
    }
    getPar();
}
function getPar(){
    for(let hole = 0; hole < 9; hole++){
        // let xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function () {
        //     if(this.readyState === 4 && this.status === 200){
        //         let mycourse = JSON.parse(this.responseText);
        //         console.log(mycourse);
        //         let yards = mycourse.data.holes[hole].teeBoxes[tee].yards;
        //         console.log("Yards: " + yards);
        //         $(".yards").append("<th scope='col'>"+ yards +"</th>")
        //     }
        // };
        // xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + id, true);
        // xhttp.send();
        $(".par").append("<th scope='col'>0</th>");
    }
    $(".par").append("<th scope='col' class='in'></th>");
    for(let hole = 9; hole < 18; hole++){
        $(".par").append("<th scope='col'>0</th>");
    }
}
function addPlayer() {
    $(".table").append("<tbody class='player player"+ counter + "'>\n" +
        "        <tr>\n" +
        "            <td><input placeholder='Player name'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput inP"+ counter +"'></td>\n" +
        "            <td><span class='inScore'>0</span></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td class='scoreBox'><input class='scoreInput outP"+ counter +"'></td>\n" +
        "            <td><span class='outScore'>0</span></td>\n" +
        "            <td><span class='totalScore'>0</span></td>\n" +
        "        </tr>\n" +
        "    </tbody>");
    $(".inScore").parent().css("background-color","lightgray");
    $(".outScore").parent().css("background-color", "lightgray");
    $(".totalScore").parent().css("background-color", "#AEA7F0");
    counter++;
}
function deletePlayer(){
    $("tbody").append("<i class='fas fa-times-circle'></i>");
    // addEventListener("click", $(".player").remove());
}
//
//
// function addScore(playerId){
//     let myscore = 0;
//     //parse player number out of id
//     for(let i = 0;){
//         let scoreitem = $("#p" + p + "h" + i).val();
//         myscore += scoreitem;
//     }
//     return myscore;
//
//
// }
