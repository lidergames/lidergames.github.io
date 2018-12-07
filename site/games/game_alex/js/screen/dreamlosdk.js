
var dreamloSDK = {
	init : function() {
		this.privateKey = 'jOkFyRr48k2t8jN8Ao0wKguHC59lL42kmRxvOUEbNdng';
		this.publicKey = '5bf48cceb6397e00e07d1692';
		this.XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

		this.xhr = new this.XHR();
	},
	getLB: function() {
		var leaders;
		if ( this.xhr ) {
			this.xhr.open( "GET", "http://dreamlo.com/lb/5bf48cceb6397e00e07d1692/json", true );
			this.xhr.onload = function() {
					leaders = JSON.parse(this.responseText).dreamlo.leaderboard.entry;
			}
			this.xhr.onerror = function() {
					alert( "Не удалось сделать запрос" );
			}
			this.xhr.send();
		} else {
			alert( "Извините но ваш браузер не поддерживает Кроссдоменные запросы." );
		}
		return leaders;
	},
	pushScore: function(name,countObjects,timeGame) {
		this.xhr.open('GET','//dreamlo.com/lb/'+this.privateKey+'/add/'+name+'/'+timeGame+'/'+countObjects,true);
		this.xhr.onerror = function() {
			alert( 'Ошибка ' + this.status );
		  }
		this.xhr.send();
	},
	isNewRecord(youCountObjects) {
		var l = this.getLB() 
		if(l[0].score<youCountObjects) {
			return true
		}
		return false
			
			
		}
	}
