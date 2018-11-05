let courseCollection;
let numPlayers = 5;
let numHoles = 18;

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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            mycourse = JSON.parse(this.responseText);
            console.log(mycourse);

            let teeArray = mycourse.data.holes[0].teeBoxes;
            for(let i = 0; i < teeArray.length; i++){
                $("#teeSelect").append("<option value='" + i + "'>" + teeArray[i].teeType + "</option>");
            }
            buildCard();
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses/" + courseid, true);
    xhttp.send();
}

function buildCard(){
    for(let i = 0; i <= numHoles; i++){
        // $(".card").append("<div id='column" + i + "' class='column'>" + i + "</div>");
    }
    addHoles();
}

function addHoles(){
    for(let p = 1; p <= numPlayers; p++){
        for(let h = 1; h <= numHoles; h++){
            //$("#column" + h). append("<input type='text' id = 'p" + p + "h" + "'>");
        }
    }
}
function addPlayer() {
    console.log("add player please");
}
