$(document).ready(function() {

    var config = {
        apiKey: "AIzaSyDreF5lym7OL9aGj-exF2B2QGikomSx7vs",
        authDomain: "train-scheduler-e36d0.firebaseapp.com",
        databaseURL: "https://train-scheduler-e36d0.firebaseio.com",
        projectId: "train-scheduler-e36d0",
        storageBucket: "train-scheduler-e36d0.appspot.com",
        messagingSenderId: "954106636998"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      $(".submitInput").on("click", function (event) {
          var nameInput = $("#nameInput").val().trim();
          var numberInput = $("#numberInput").val().trim();
          var destinationInput = $("#destInput").val().trim();
          var timeInput = $("#timeInput").val().trim();
          var frequencyInput = $("#freqInput").val().trim();

          if 

            (nameInput != "" &&
             numberInput != "" &&
             destinationInput != "" &&
             timeInput.length === 4 &&
             frequencyInput != "") 
             
             {
                 database.ref().push({
                     name: nameInput,
                     number: numberInput,
                     destination: destinationInput,
                     time: timeInput,
                     frequency: frequencyInput
                 });
             }

             else {
                 alert("Please Enter Valid Train Data");
                 $("input").val("");
                 return false;
             }

             console.log(database);

             $("input").val("");
      });

      database.ref().on("child_added", function (childSnapshot) {
          console.log(childSnapshot.val()); 

          var name = childSnapshot.val().name;
          var number = childSnapshot.val().number;
          var destination = childSnapshot.val().destination;
          var time = childSnapshot.val().time;
          var frequency = childSnapshot.val().frequency;

          console.log(name, number, destination, time, frequency);

          var frequency = parseInt(frequency);
          var currentTime = moment();

          console.log("Current time: " +moment().format("HHmm"));

        //   var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

          var trainTime = moment(childSnapshot.val().time, "HHmm").format("HHmm");

        //   var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
          var timeDifference = moment().diff(moment(trainTime, "HHmm"), "minutes");

          var timeRemaining = timeDifference % frequency;

          var timeAway = frequency - timeRemaining;

          var nextArrival = moment().add(timeAway, "minutes");

          var arrivalDisplay = moment(nextArrival).format("HHmm");

        $("#boardText").append(
            "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
                "<td id='numberDisplay'>" + childSnapshot.val().number +
                "<td id='destinationDisplay'>" + childSnapshot.val().destination +
                "<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
                "<td id='arrivalDisplay'>" + arrivalDisplay +
                "<td id='awayDisplay'>" +timeAway + " minutes until arrival" + "</td></tr>");

      });

      $(".resetInput").on("click", function(event){
          location.reload();
      });

      setInterval("window.location.reload()", 180000);
});