$(function() {
		function newHabit() {
			var cont = $("#tx").val()
			$("#habits").append(
				"<p>"+ cont +"</p>" + "<button id=\"" + cont + "\"> Do habit </button>" 
				);
		}

		function send(cont) {
          var link = "https://dweet.io/dweet/for/hbtr?" + cont;
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.open("GET", link, false);
          xmlHttp.send(null);
          console.log(xmlHttp.responseText);
		}

		$("body > button").click(()=>{
			console.log("cr8d");
			newHabit();
		});

		$("#habits").on("click", "button", (b)=>{
			console.log("sent");
			send($(b)[0].target.id);
		});
	});