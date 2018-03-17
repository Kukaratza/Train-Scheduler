// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAL6HYHZafBPmRURgpyWjP5Wb58PnHKig",
    authDomain: "train-schedule-5f7a4.firebaseapp.com",
    databaseURL: "https://train-schedule-5f7a4.firebaseio.com",
    projectId: "train-schedule-5f7a4",
    storageBucket: "train-schedule-5f7a4.appspot.com",
    messagingSenderId: "909720900106"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function () {
    event.preventDefault();
    //get the values of the input
    let train = $("#inputName").val();
    let destination = $("#inputDestination").val();
    let firstTrain = $("#inputFirstTrain").val();
    let frequency = $("#inputFreq").val();
//convert the firstTrain.val() into hh:mm
    let firstTrainConv = moment(firstTrain, "hh:mm").subtract(1, "years");
//get the current time   
    let currentTime = moment();
//get the difference in minutes between firstTrain(hh:mm) and current time                                                           
    let diffTime = moment().diff(moment(firstTrainConv), "minutes");
//reminder of diffTime and frequency of train
    let timeR = diffTime % frequency;
//Minutes away = frequency(minutes) - reminder
    let minsAway = frequency - timeR;
//add current time + minutes Away
    let nextTrain = moment().add(minsAway, "minutes");
//format next Train into hh:mm
    let nextTrainFormatted = moment(nextTrain).format("hh:mm");
    console.log(diffTime);

    database.ref().push({
        train: train,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        nextTrainFormatted: nextTrainFormatted,
        minsAway: minsAway,
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    $('#inputName').val('');
    $('#inputDestination').val('');
    $('#inputFirstTrain').val('');
    $('#inputFreq').val('');
});

database.ref().on("child_added", function (snapshot) {

    //Log everything that's coming out of snapshot
    // console.log(snapshot.val());
    // console.log(snapshot.val().train);
    // console.log(snapshot.val().destination);
    // console.log(snapshot.val().firstTrain);
    // console.log(snapshot.val().frequency);

    $("tbody").append(`<tr><td>${snapshot.val().train}</td><td>${snapshot.val().destination}</td><td>${snapshot.val().frequency}</td><td>${snapshot.val().nextTrainFormatted}</td><td>${snapshot.val().minsAway}</td></tr>`);

    // Handle the errors

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//   console.log(moment().format("HH:mm"));