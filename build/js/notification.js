function close() {
	console.log("close")
}//end getChildren

function notification(container,notifications) {
	var time = 0.25;
	notifications.forEach(function(self,index) {
		var item = document.createElement("li");
		item.innerHTML = "<div class='wrap-notification'>"+
			 	               "<div class='notification-type-"+self.type+"'></div>"+
			 	               "<div class='wrap-body'>"+
				 	               "<b class='wrap-title'>"+self.title+"</b>"+
				 	               "<p class='wrap-text'>"+self.text+"</p>"+
				 	               "<button class='"+ (self.btnClose ? "" : "hide") +" btn-close'>X</button>"+
				 	               "</div>"+
		 	               " </div>";
		item.style = "animation-delay:"+time+"s;";
		container.appendChild(item);
		var btn = document.getElementsByClassName("btn-close");
		for (var i = 0; i < btn.length; i++) {
			btn[i].onclick = function() {
				var parent = this.parentNode.parentNode.parentNode.style = "opacity:1;animation-name:disappear; animation-duration:0.5s;";
			}
		}





		if(self.closeAt) {
			setTimeout(function() {
				item.style = "animation-name: disappear";
				//container.removeChild(item);
			},self.closeAt*(index+1))
		}
	  time += time;
	})
}//end notification
