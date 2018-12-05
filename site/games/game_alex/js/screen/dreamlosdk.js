
var dreamloSDK = {
	init : function() {
		this.privateKey = 'jOkFyRr48k2t8jN8Ao0wKguHC59lL42kmRxvOUEbNdng';
		this.publicKey = '5bf48cceb6397e00e07d1692';
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		this.xhr = new XHR();
	},
	getLB: function() {
		this.xhr.open('GET','http://dreamlo.com/lb/'+this.publicKey+'/json',true);
		var leaders = [];
		this.xhr.onload = function() {
			var leaderboards = JSON.parse(this.responseText).dreamlo.leaderboard;
			
			leaders = leaderboards.entry

			return leaderboards.entry
			//name,score,seconds,text
		  }
		  
		this.xhr.onerror = function() {
			alert( 'Ошибка ' + this.status );
		  }
		  
		this.xhr.send();
		return JSON.parse(this.responseText).dreamlo.leaderboard;
	},
	pushScore: function(name,countObjects,timeGame) {
		this.xhr.open('GET','http://dreamlo.com/lb/'+this.privateKey+'/add/'+name+'/'+countObjects+'/'+timeGame,true);
		this.xhr.onerror = function() {
			alert( 'Ошибка ' + this.status );
		  }
		this.xhr.send();
	}
}