var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}
var dreamloSDK = {
	init : function() {
		this.privateKey = 'jOkFyRr48k2t8jN8Ao0wKguHC59lL42kmRxvOUEbNdng';
		this.publicKey = '5bf48cceb6397e00e07d1692';
		this.XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

		this.xhr = new this.XHR();
		this.client = new HttpClient();
	},
	getLB: function() {
		var leaders;
<<<<<<< HEAD
		if ( this.xhr ) {
			this.xhr.open( "GET", "http://dreamlo.com/lb/5bf48cceb6397e00e07d1692/json", false );
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
=======
		this.client.get("http://dreamlo.com/lb/5bf48cceb6397e00e07d1692/json",function(response) {
				leaders = JSON.parse(response).dreamlo.leaderboard.entry;
			});
		//if ( this.xhr ) {
		//	
		//	this.xhr.open( "GET", "dreamlo.com/lb/5bf48cceb6397e00e07d1692/json", false );
		//	this.xhr.onload = function() {
		//			leaders = JSON.parse(this.responseText).dreamlo.leaderboard.entry;
		//	}
		//	this.xhr.onerror = function() {
		//			alert( "Не удалось сделать запрос" );
		//	}
		//	this.xhr.send();
		//} else {
		//	alert( "Извините но ваш браузер не поддерживает Кроссдоменные запросы." );
		//}
>>>>>>> 36796464836da6ab29a91392fd2924746477de82
		return leaders;
	},
	pushScore: function(name,countObjects,timeGame) {
		this.xhr.open('GET','http://dreamlo.com/lb/'+this.privateKey+'/add/'+name+'/'+timeGame+'/'+countObjects,false);
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
