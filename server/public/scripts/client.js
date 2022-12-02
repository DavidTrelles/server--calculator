$(onReady);

function onReady() {
  $(".op").on("click", operator);
  $("#submit").on("click", calculate);
  render()
}

let operator1 = "";
function operator() {
  operator1 = $(this).text();
}
function calculate() {
  if ($("#num1").val()===""||$("#num2").val()==="") {
    alert ("please fill in all fields");
    return
  }
  let newCalculation = {
    num1: $("#num1").val(),
    operation: operator1,
    num2: $("#num2").val(),
  };
  $("#num1").val("");
  $("#num2").val("");
  operator1 = ""

  console.log(newCalculation);
  $.ajax({
    method: "POST",
    url: "/calculations",
    data: newCalculation,
  }).then(function (response) {
    console.log("post status", response);
  });

  render()
  
}

function render(){
$.ajax({
  method: "GET",
  url: "/calculations",
}).then(function (response) {
  console.log(response);
  $("#output").empty();
  for (let calculation of response) {
    $("#output").append(
      `<li>${calculation.num1} ${calculation.operation} ${calculation.num2} = ${calculation.sol}</li>`
    );
  }
});
}