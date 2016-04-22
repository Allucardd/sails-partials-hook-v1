$(".close-session").on("click",function(e) {
	e.preventDefault();
	$.ajax({
		method:"PUT",
		url:"/login",
		success:function(data) {
			window.location.href = "/";
		},
		error:function(response) {
			if(response.status === 500) {
				var message = {title:"Ooops!!",text:"error interno de el servidor por favor intenta mas tarde",type:"error"};
				swal(message);
			} else if(response.status === 403) {
				if( response.data.message === "user is already log out") {
					var message = {title:"",text:"Sesion cerrada",type:"info"};
					swal(message);
				}
			}

		}
	})
})


notification(document.getElementById("wrapper-notifications"),[{
	title:"Confirmar cuenta",
	text:"Es requierido que propocienes un <a href='/profile'>correo electronico</a>, para en caso tal de que <b> olvides tu contraseña </b> tengamos forma de restablecerla.</b>",
	btnClose:true,
	type:"info"
},{
	title:"Respuesta",
	text:"XXX respondio tu <a href='#'>post</a>",
	btnClose:true,
	type:"info"
}])
