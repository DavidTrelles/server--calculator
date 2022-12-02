$(onReady);

function onReady() {
  $(".op").on("click", operator);
  $("#submit").on("click", calculate);
}

let operator1 = "";
function operator() {
  operator1 = $(this).text();
}
function calculate() {
  let newCalculation = {
    num1: $("#num1").val(),
    operation: operator1,
    num2: $("#num2").val(),
  };
  $("#num1").val("");
  $("#num2").val("");

  console.log(newCalculation);
  $.ajax({
    method: "POST",
    url: "/calculations",
    data: newCalculation,
  }).then(function (response) {
    console.log("post status", response);
  });

  $.ajax({
  method:"GET",
  url:"/calculations",
  }).then(function(response) {
    console.log(response)
    $("#output").empty()
    for( let calculation of response) {
      $("#output").append(`<li>${calculation.num1}${calculation.operation}${calculation.num2}=${calculation.sol}</li>`)
    }
  })
}
