(() => {

if(window.$ == null){
	console.error('Have to include jquery');
	return;
}

//Global variables start
const modalStack = [];
//Global variables end

function wrapModalContainer(){
	$('.modal').wrap('<div class="modal-container"></div>');
}

function addStyleToContainer(){
  $('.modal-container').css({
  	display: 'none', 
  	position: 'fixed', 
  	left: 0,
  	top: 0,
  	width: '100%',
  	height: '100%',
  	overflow: 'auto',
  	'background-color': 'rgb(0,0,0)',
  	'background-color': 'rgba(0,0,0,0.4)',
  	'text-align': 'center',
  });
}

function addStyleToModal(){
  $('.modal').css({
  	'background-color': '#fefefe',
  	margin: '15% auto',
  	padding: '20px',
  	border: '1px solid #888',
  	display: 'inline-block',
	border-radius: '10px',
  });

	$('.modal').on('click', (e) => {
		e.stopPropagation();
	});

}

function addClickEventToModalContainer(){
  $.each($('.modal-container'), function(){
  	const $modal = $(this);
  	$modal.on('click', () => {
			hide();
  	});
  });
}

wrapModalContainer();
addStyleToContainer();
addStyleToModal();
addClickEventToModalContainer();

function show(id, callback){
	if(modalStack == null){
		modalStack = [];
	}

	$modalContainer = $('#' + id).parent();
	modalStack.push({
		$modalContainer: $modalContainer,
		callback: callback,
	});
	$modalContainer.fadeIn();
	$modalContainer.css('z-index', modalStack.length);
}

function hide(data){
	const stack = modalStack.pop();
	stack.$modalContainer.fadeOut();
	if(stack.callback != null){
		stack.callback(data);
	}
}


window.Modal = {
	show,
	hide,
	modalStack,
}

})();
