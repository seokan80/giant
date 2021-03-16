var Common = {
	init : function(){
		Common.common();
	},
	common : function(){

	}
};

const Gnb = {
	init : function(){
		var dep1 = document.querySelectorAll('.dep1-link');
		console.log(dep1);
		for (var i = 0 ; i < dep1.length; i++) {
			dep1[i].addEventListener('click' , this.toggle , false ) ;
		}
	},
	toggle : function(event){
		var item = this;
		var myLi = this.parentNode;

		if(myLi.classList.contains('has-treeview')){
			event.preventDefault();
			myLi.classList.toggle('open');
		}
	}
};

Common.init();
Gnb.init();