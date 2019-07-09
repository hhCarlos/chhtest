/*
 * App Multiplica, Usuario v1.0.0.7
 * Autor: Carlos Enrique Hernandez Hernandez
 * Include: index.html
 * Desc: App que muestra los usuarios dados de un webservice y este despliega cierta informacion, el usuario es capaz de hacer peticiones
 		 para poder obtener la informacion completa del usuario seleccionado asi como sus albunes de fotos
 */

/*
 * Type: Init
 * Name: IIFE
 * Desc: Inicia las funciones cuando el documento ha sido cargado
 * Params: N/A
 * Return: N/A
 */
(function IIFE(){

	const usuarios_tabla = document.getElementById('usuarios_tabla'),
		  ver_todo_usuarios_btn = document.getElementById('ver_todo_usuarios'),
		  modal_container = document.getElementById('modal_container'),
		  close_modal_button = document.getElementsByClassName('close_modal'),
		  modal_photos_album = document.getElementById('modal_photos_album'),
		  user_data_sections = document.getElementById('user_data_sections'),
		  user_left_data_company = document.getElementById('user_left_data_company'),
		  user_left_data_address = document.getElementById('user_left_data_address'),
		  modal_user_albums_container = document.getElementById('modal_user_albums'),
		  modal_photos_album_close_button = document.getElementById('modal_photos_album_close'),
		  album_images_title_label = document.getElementById('album_images_title'),
		  album_images_by_label = document.getElementById('album_images_by'),
		  images_of_album_container = document.getElementById('images_of_album'),
		  serchbar_input = document.getElementById('serchbar_input'),
		  chh_logo_container = document.getElementById('chh_logo'),
		  my_clock_timer_container = document.getElementById('my_clock_timer'),
		  fileViewer = filePreviewerApp(),
		  photosApp = weLovePhotosApp(),
		  date = new Date(); 

  	var users_list = {},
  		last_user_gotted = {},
  		all_albums_data = {},
  		random_image_numer = 0,
  		date_hour = date.getHours(),
  		date_minutes = date.getMinutes(),
  		date_seconds = date.getSeconds();

  	ajaxRequest( {verb: 'GET', action: 'fillUsers',url: 'https://jsonplaceholder.typicode.com/users'} );

  	setTimeout( function getAllAlbumsData() {

  		ajaxRequest( {verb: 'GET', action: 'getAllAlbumsData',url: 'http://jsonplaceholder.typicode.com/albums/1/photos'} );

  	}, 700);

  	drawMyLogo();
  	initClock();

  	/*
	 * Type: Element Trigger Event
	 * Name: N/A
	 * Desc: Function que despliega la lista con todos los usuarios
	 * Params: N/A
	 * Return: N/A
	 */
	ver_todo_usuarios_btn.addEventListener('click', function muestraTodosLosUsuarios(event) {

		let this_element_data = event.target;

			if( this_element_data.classList.contains('ver_todos') ) {

				this_element_data.innerHTML = 'Top 5';
				this_element_data.classList.remove('ver_todos');
				this_element_data.classList.remove('able-scroll-y');
				usuarios_tabla.style.height = 'auto';

			} else {

				this_element_data.innerHTML = 'See All...';
				this_element_data.classList.add('ver_todos');
				this_element_data.classList.add('able-scroll-y');
				usuarios_tabla.style.height = '60rem';

			}

	}, !1);



	/*
	 * Type: Element Trigger Event Loop
	 * Name: N/A
	 * Desc: Funcion que despliega el modal con la informacion del usuario seleccionado
	 * Params: N/A
	 * Return: N/A
	 */
	for( let button = close_modal_button.length; button--; ) {

		close_modal_button[button].addEventListener('click', function closeModalPopUp() {

			modal_container.classList.add('display-none');
			modal_container.classList.remove('display-block');

			modal_head_container.innerHTML = '';
			user_left_data_company.innerHTML = '';
			user_left_data_address.innerHTML = '';
			modal_user_albums_container.innerHTML = '';


		}, !1);

	}



	/*
	 * Type: Element Trigger Event
	 * Name: N/A
	 * Desc: Funcion que cierra el modal de imagenes del album seleccionado
	 * Params: N/A
	 * Return: N/A
	 */
	modal_photos_album_close_button.addEventListener('click', function closeAlbumContainerModal() {

		modal_photos_album.children[0].classList.remove('opacity-full');
		modal_photos_album.classList.add('display-none');
		album_images_title_label.innerHTML = '';
		album_images_by_label.innerHTML = '';
		images_of_album_container.innerHTML = '';

	}, !1);



	/*
	 * Type: Element Trigger Event
	 * Name: N/A
	 * Desc: Funcion que permite la busqueda en el arreglo de usuarios lista
	 * Params: N/A
	 * Return: N/A
	 */
	serchbar_input.addEventListener('keyup', function finduserWith( event ) {

		this_element_data = event.target; 

		let user_finder = users_list.filter( user => user.name.toLowerCase().includes( this_element_data.value.toLowerCase() ) ); 
			usuarios_tabla.innerHTML = '';
			photosApp.fillUsers( user_finder ); 
  			photosApp.getUserData();

	}, !1);


	/*
	 * Type: Function
	 * Name: getImageMapFromGoogleMaps
	 * Desc: Funcion para pedir la imagen de un mapa a la API de google y hacerle el append
	 * Params: {} Con las propiedades para el mapa y el contenedor al que se va aderir
	 * Return: N/A
	 */
	 function getImageMapFromGoogleMaps( mapSettings ) {

	 	var lt = mapSettings.lat, 
	 		ln = mapSettings.lng, 
	 		new_map = "http://maps.googleapis.com/maps/api/staticmap";
	 		new_map += "?center=" + lt + "," + ln;
	 		new_map += "&zoom=18";
	 		new_map += "&size=400x300";
	 		new_map += "&sensor=false",
	 		image_map = customElement( {kind: 'img', id: null, class: ''} );
	 		image_map.setAttribute('src', new_map),
	 		user_map_container = document.getElementById('user_map');

	 		user_map_container.appendChild( image_map );

	 }



	/*
	 * Type: Function
	 * Name: drawMyLogo
	 * Desc: Funcion para pedir la imagen de un mapa a la API de google y hacerle el append
	 * Params: {} Con las propiedades para el mapa y el contenedor al que se va aderir
	 * Return: N/A
	 */
	 function drawMyLogo() {

	 	var ctx = chh_logo_container.getContext('2d');
	 		ctx.font = "600 70px Arial";
			ctx.fillStyle = "white";
			ctx.strokeStyle = 'black';
			ctx.textAlign = "center";
			ctx.lineWidth  = 1.25;
			ctx.fillText("CHH", chh_logo_container.width/2, chh_logo_container.height/1.15);
			
			for( let i = 0; i < 7; i+=1) { console.log(i);
				ctx.strokeText("CHH", chh_logo_container.width/2 + i, chh_logo_container.height/1.2 + i);
			}

			ctx.fillStyle = 'rgba(0,0,0,.4)';
			ctx.fillRect(chh_logo_container.width - 2.5, 0, 2.5, chh_logo_container.height);

	 }



	 /*
	 * Type: Function
	 * Name: initClock
	 * Desc: Funcion para pedir la imagen de un mapa a la API de google y hacerle el append
	 * Params: {} Con las propiedades para el mapa y el contenedor al que se va aderir
	 * Return: N/A
	 */
	 function initClock() {

	 	function startClock() {

	 		
	 		if( date_seconds == 59 ) {

	 			date_seconds = 0;
	 			date_minutes = date_minutes + 1;

	 			if( date_minutes == 59 ) {

	 				date_minutes = 0;
	 				date_hour = date_hour + 1;

	 				if( date_hour == 24 ) {

	 					date_hour = 0;
	 					date_hour = 13;

	 				}

	 			}

	 		} else {

	 			date_seconds = date_seconds + 1;

	 		}

	 		date_minutes <= 9 ? 
	 		 my_clock_timer_container.children[2].innerHTML = '0' + date_minutes : 
	 		 my_clock_timer_container.children[2].innerHTML = date_minutes;

	 		date_seconds <= 9 ? 
	 		 my_clock_timer_container.children[3].innerHTML = '0' + date_seconds : 
	 		 my_clock_timer_container.children[3].innerHTML = date_seconds;

	 		my_clock_timer_container.children[0].innerHTML = date_hour;
	 		

	 		initClock();

	 	}

	 	setTimeout( function everySecond() {

	 		startClock();

	 	}, 1000);

	 }




	/*
	 * Type: Function
	 * Name: ajaxRequest
	 * Desc: Funcion para ejecutar una peticion al servidor y utilizar la funcion correspondiente
	 * Params: {} con los datos para la peticion: url, verbo web, accion
	 * Return: N/A
	 */
	function ajaxRequest( requestParams ) { 

		var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {

			   if (this.readyState == 4 && this.status == 200) {

			   	  switch( requestParams.action ) {

			   	  	case 'fillUsers': 
			   	  		users_list = JSON.parse(this.responseText);
			   	  		photosApp.fillUsers( users_list ); 
			   	  		photosApp.getUserData();
			   	  		break;

		   	  		case 'getAlbumsUser':
		   	  			last_user_gotted = JSON.parse(this.responseText);
		   	  			photosApp.userSelectedAlbums( last_user_gotted );
		   	  			break;

   	  				case 'getAllAlbumsData':
   	  					all_albums_data = JSON.parse(this.responseText); 
   	  					break;

			   	  }

			   }

			};

			xhttp.open(requestParams.verb, requestParams.url, true);
			xhttp.send()

	}


	/*
	 * Type: Function
	 * Name: customElement
	 * Desc: Funcion que genera un componente customizado con los atributos dados
	 * Params: {} con los atributos y tipo de componente
	 * Return: {} Componente en modo de objeto HTML
	 */
	function customElement( elementSettings ) {

		let new_element = document.createElement( elementSettings.kind );
			new_element.setAttribute('id', elementSettings.id );
			new_element.setAttribute('class', elementSettings.class);

			return new_element;

	}


	/*
	 * Type: Module
	 * Name: weLovePhotosApp
	 * Desc: API con funciones de comportamiento de la aplicacion
	 * Params: N/A
	 * Return: {} API con las funciones publicas a seleccionar
	 */
	function weLovePhotosApp() {

		const PUBLIC_API = {
			fillUsers: fillUsers,
			getUserData: getUserData,
			userSelectedAlbums: userSelectedAlbums
		};

		var user_selected = {};

		function fillUsers( usersJson ) {

			let new_user = '', 
				this_user = '', 
				this_figure_user = '',
				this_data_user = '',
				this_link_user = '';

			for( let user of usersJson ) { 

				random_image_numer = Math.floor( Math.random() * 29);

				new_user = customElement({kind: 'div', id: 'user_' + user.id, class: 'usuarios__row'});
				usuarios_tabla.appendChild( new_user );	
				this_user = document.getElementById( new_user.id );

				this_figure_user = customElement({kind: 'figure', id: '', class: 'usuario__foto'});
				this_figure_user.innerHTML = '<img src="img/img_' + random_image_numer + '.jpg" class="usuario__img" />';
				this_user.appendChild( this_figure_user );

				this_data_user = customElement({kind: 'div', id: '', class: 'usuario__info'});
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--titulo">' + user.name + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--subtitulo">' + user.company.name + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">Email: </label>' + user.email + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">Phone: </label>' + user.phone + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">User: </label>' + user.username + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">Web Site: </label>' + user.website + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato usuario__dato--head">Empresa</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">Lema: </label>' + user.company.catchPhrase + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">BS: </label>' + user.company.bs + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato usuario__dato--head">Direccion</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">City: </label>' + user.address.city + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">Street: </label>' + user.address.street + '</span>';
				this_data_user.innerHTML += '<span class="usuario__dato usuario__dato--dato"><label class="dato--strong">Zip: </label>' + user.address.zipcode + '</span>';
				this_user.appendChild( this_data_user );		

				this_link_user = customElement({kind: 'button', id: user.id, class: 'usuario__link'});
				this_link_user.innerHTML = 'See Albums';
				this_user.appendChild( this_link_user );

			}

		}

		function getUserData() {

			let usuario_more_data = document.getElementsByClassName('usuario__link');

				for( let row_as_btn = usuario_more_data.length; row_as_btn--; ) {

					usuario_more_data[row_as_btn].addEventListener('click', function getUserSelectedData( event ) {

						this_element_data = event.target;

						modal_container.classList.remove('display-none');
						modal_container.classList.add('display-block');

						user_selected = users_list.find( usuario => usuario.id == this_element_data.id ); 

						ajaxRequest( {verb: 'GET', action: 'getAlbumsUser',url: 'http://jsonplaceholder.typicode.com/albums?userId=' + user_selected.id} );

					}, !1);

				}

		}

		function userSelectedAlbums( albumsData ) {

			const modal_head_container = document.getElementById('modal_head_container');

				  user_selected = users_list.find( usuario => usuario.id == albumsData[0].userId );

				  buildModalHead();
				  buildSectionsData();
				  buildAlbumsSection();

				  function buildModalHead() {

					let head_figure = {},
						head_data = {};

						head_figure = customElement( {kind: 'figure', id: 'user_head_image', class: 'singleu__img'} );
						head_figure.innerHTML = '<img class="singleu__photo" src="http://automatist.org/2016/web/TensorFlow%20for%20poets%20-%20O%27Reilly%20Media_files/tarsier.png" />';
						modal_head_container.appendChild( head_figure );

						head_data = customElement( {kind: 'div', id: 'user_head_data', class: 'singleu__data'} );
						head_data.innerHTML += '<h4 class="singleu__row singleu__row--name">' + user_selected.name + '</h4>';
						head_data.innerHTML += '<span class="singleu__row singleu__row--main"><label class="dato--strong">Username: </label>' + user_selected.username + '</span>';
						head_data.innerHTML += '<span class="singleu__row singleu__row--main"><label class="dato--strong">Email: </label>' + user_selected.email + '</span>';
						head_data.innerHTML += '<span class="singleu__row singleu__row--main"><label class="dato--strong">Phone: </label>' + user_selected.phone + '</span>';
						head_data.innerHTML += '<span class="singleu__row singleu__row--main"><label class="dato--strong">Web Site: </label>' + user_selected.website + '</span>';
						modal_head_container.appendChild( head_data );

				}

				function buildSectionsData() {

						user_left_data_company.innerHTML += '<h4 class="singleu__row singleu__row--section">Company</h4>';
						user_left_data_company.innerHTML += '<span class="singleu__row singleu__row--dato"><label class="dato--strong">Name: </label>' + user_selected.company.name + '</span>';
						user_left_data_company.innerHTML += '<span class="singleu__row singleu__row--dato"><label class="dato--strong">BS: </label>' + user_selected.company.bs + '</span>';
						user_left_data_company.innerHTML += '<span class="singleu__row singleu__row--dato"><label class="dato--strong">Catch Phrase: </label>' + user_selected.company.catchPhrase + '</span>';

						user_left_data_address.innerHTML += '<h4 class="singleu__row singleu__row--section">Address</h4>';
						user_left_data_address.innerHTML += '<span class="singleu__row singleu__row--dato"><label class="dato--strong">City: </label>' + user_selected.address.city + '</span>';
						user_left_data_address.innerHTML += '<span class="singleu__row singleu__row--dato"><label class="dato--strong">Street: </label>' + user_selected.address.street + '</span>';
						user_left_data_address.innerHTML += '<span class="singleu__row singleu__row--dato"><label class="dato--strong">Suite: </label>' + user_selected.address.suite + '</span>';
						user_left_data_address.innerHTML += '<span class="singleu__row singleu__row--dato"><label class="dato--strong">ZP: </label>' + user_selected.address.zipcode + '</span>';

				}

				function buildAlbumsSection() {

					let ableAlbumLinkButtons = '';

					for( let album of  albumsData ) {

						let new_album = customElement( {kind: 'div', id: 'user_album_' + album.id, class: 'user__album'} ),
							this_new_album = {},
							new_album_content = '';

							random_image_numer = Math.floor( Math.random() * 29);
							modal_user_albums_container.appendChild( new_album );
							this_new_album = document.getElementById( new_album.id );

							new_album_content = customElement( {kind: 'figure', id: null, class: 'album__user'} );
							new_album_content.innerHTML = '<img class="album__img" src="img/img_' + random_image_numer + '.jpg" />'
													    + '<div class="album__data">'	
									                    + '<span class="album__titulo">' + album.title + '</span>'	
									                    + '<span class="album__button" id="deplay_album_' + album.id + '">Open</span>'	
									                    + '</div>';


		                    this_new_album.appendChild( new_album_content );

					}

					ableAlbumLinkButtons = (function(){

						let album_button = document.getElementsByClassName('album__button'); 
						var this_element_data = '',
							button_id = '',
							images_from_album = [];

						for( let button = album_button.length; button--; ) {

							album_button[button].addEventListener('click', function createNewAlbumModal( event ) {

								this_element_data = event.target;
								button_id = this_element_data.id.split('_')[this_element_data.id.split('_').length - 1];
								
								for( let album of all_albums_data ) {

									if( album.albumId == button_id) {

										images_from_album.push( album );

									}

								}

								showPhotosAlbumSelected( button_id, images_from_album, albumsData );								

							}, !1);

						}

					}());

				}
					
				//getImageMapFromGoogleMaps( { lat: user_selected.address.geo.lat, lng: user_selected.address.geo.lng, id_component: 'user_map' } );

		}

		function showPhotosAlbumSelected( album_id, album_images, albums_data ) { 

			let this_album_selected = albums_data.find( album => album.id == album_id );

			album_images_by_label.innerHTML = user_selected.name;
			album_images_title_label.innerHTML = this_album_selected.title;
			modal_photos_album.classList.remove('display-none');
			
			setTimeout( function showAlbum() {

				modal_photos_album.children[0].classList.add('opacity-full');

			}, 100 );

			for( let image_album of album_images )  {

				let new_image = customElement( {kind: 'figure', id: null, class: 'album__content-figure'});
					new_image.innerHTML = '<img class="album__content-image" src="' + image_album.url + '" images-gallery="ready" />';

					images_of_album_container.appendChild( new_image );
			}

			fileViewer.preview_image('images-gallery');

		}

		return PUBLIC_API;

	}



	/*
	 * Type: Module
	 * Name: Show Gallery Files Previewer
	 * Desc: API con funcion para visualizar archivos (solo imagenes)
	 * Params: N/A
	 * Return: {} API con las funciones publicas a seleccionar
	 */
	 function filePreviewerApp() {

	 	const PUBLIC_API = {
	 		preview_image: preview_image
	 	}

	 	function preview_image( image_selector ) { 

	 		let images_from_album = document.querySelectorAll('[' + image_selector + '=ready]');

	 			for( let image_as_button = images_from_album.length; image_as_button--; ) {

	 				images_from_album[image_as_button].addEventListener('click', function showMeThatImage( event ){

	 					this_element_data = event.target; 
	 					createFilePreviewerContainer( this_element_data );

	 				}, !1);

	 			}

	 	}

	 	function createFilePreviewerContainer( file_to_watch ) {

	 		const page_body = document.getElementsByTagName('body')[0],
	 			  previewer_wrapper = customElement( {kind: 'div', id: 'previewer_app', class: 'previewer__wrapper'}),
	 			  previewer_menu = customElement( {kind: 'div', id: 'previewer_app_menu', class: 'previewer__menu'} ),
	 			  previewer_image = customElement( {kind: 'img', id: '', class: 'previewer__image'} );

	 			  previewer_menu.innerHTML = '<button id="previewer_menu_close" class="previewer__button previewer__button--close">x</button>'
	 			  						   + '<button id="previewer_menu_big" class="previewer__button previewer__button--plus display-none">+</button>'
	 			  						   + '<button id="previewer_menu_small" class="previewer__button previewer__button--less display-none">-</button>';

				  previewer_image.setAttribute('src', file_to_watch.src);

	 			  page_body.appendChild( previewer_wrapper );
	 			  previewer_app.appendChild( previewer_menu );
	 			  previewer_app.appendChild( previewer_image ); 

	 			  destroyGalleryApp();

	 	}

	 	function destroyGalleryApp() {

	 		const gallery_destroyer = document.getElementById('previewer_menu_close'),
	 			  previewer_app = document.getElementById('previewer_app');

	 			  gallery_destroyer.addEventListener('click', function destroyThisGallery(){

	 			  	previewer_app.remove();

	 			  }, !1);

	 	}

	 	return PUBLIC_API;

	 }



	/*
	 * Type: Module
	 * Name: Mejora el aspecto fisico de la pagina
	 * Desc: API que maneja errrores de la pagina
	 * Params: N/A
	 * Return: {} API con las funciones publicas a seleccionar
	 */
	 function appHandleError() {



	 }


}());

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 6
});
infoWindow = new google.maps.InfoWindow;

// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
  }, function() {
    handleLocationError(true, infoWindow, map.getCenter());
  });
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
                      'Error: The Geolocation service failed.' :
                      'Error: Your browser doesn\'t support geolocation.');
infoWindow.open(map);
}

