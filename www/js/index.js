/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
};
// MY VARIABLES WICH I USED FOR ASSIGN DATA FROM API RESPONSE.
  var financeResponses=[];
  var businessResponses=[];
  var responseJSON=[];
  var responses=[];

// THIS IS API FUNCTION WHICH IS GETTING API RESPONSE FROM PROVIDED WEBSITE.
function Current (news1){
// my news variable that i used to change news every time from api.i assigned my outcome news1 to news.
    var news=news1; 
    // this is api_path part of the api key .I broked api key because i put different news in it.
    var api_path='https://newsapi.org/v2/top-headlines?country=gb&category=';
    // this is api key i got from provided website.
    var api_key='&apiKey=1240607690424867b72938566bb02417';
    // its created new api request.
      var http = new XMLHttpRequest();
    //   this is url which is sending to website every time to gettin api response.
            const url =api_path+news+api_key;
            // opening url
            http.open("GET", url);
            // sending to server.
            http.send();
            // onready stage system gettin api response and parsing it with JSON.parse 
            http.onreadystatechange = () => {
                    var response = http.responseText;
                     responseJSON = JSON.parse(response);
                    //writing in console to see responses. 
                    console.log(responseJSON) ;

                                    // if my outcome news named finance my program entering to if stage.
                                    if(news=='finance'){
                                    // i create different api code for finance because i didnt get any response from first api for finance.
                            http = new XMLHttpRequest();
                            var url2 ='https://newsapi.org/v2/everything?q=finance&from=2020-1-1&sortBy=publishedAt&apiKey=1240607690424867b72938566bb02417';
                            http.open("GET", url2);
                            http.send();
                            http.onreadystatechange = () => {
                                    var response = http.responseText;
                                    responseJSON = JSON.parse(response);
                                    console.log(responseJSON) ;
                                // all up stage same as first api and sending getting response and writing in console.

                                // System getting first 10 api response and putting in array.
                                    for(var i=0;i<10;i=i+1){
                                        financeResponses[i]=responseJSON.articles[i];
                                    }
                                }
                        }
                        // when i created api for business in my first api . the system gettin first 10 response from business api and putting them in array.
                        else  if(news=='business'){
                            for(var i=0;i<10;i=i+1){
                                businessResponses[i]=responseJSON.articles[i];
                        
                            }
                        }
                        // and alse for sport it is doing exactly same things like a business.
                    else{
                        for(var i=0;i<10;i=i+1){
                            responses[i]=responseJSON.articles[i];

                        }
        }
}

      

 }
          

// this function shows all arrays(finance,business,sport) in news.html web page. 
// and also its getting information from buttons such as finance business and sport.
function shows(news){
    var news1=news;
    // writing input, button ,text and label in page for saving data to local storage.
    document.getElementById("question").innerHTML = "Would you like to save any news?<br>Please Type 0 to 9 and Click Save Button";
    document.getElementById("label").innerHTML = 'number';
    document.getElementById("input").innerHTML = '   <input type="text" name="name" id="name" align="center">';
    document.getElementById("input2").innerHTML = '<input type="submit" value="send">';
    
    // if my outcome news is equal to finance system enters to if stage.
    if(news1=='finance'){
        // changing header.
        document.getElementById("header").innerHTML = "FINANCE NEWS";
    //    saving documents by buttons and inputs that i describe beginnig of shows function.
        if (localStorage) {
      
            // Add an event listener for form submissions
            document.getElementById('contactForm').addEventListener('submit', function() {
              // Get the value of the name field.
              var name = document.getElementById('name').value;

                // getting number of news and saving that number of finance news to local storage as a json .
              localStorage.setItem('finance'+name,JSON.stringify(financeResponses[name]));
            //   showing in console.
                console.log(localStorage.getItem('finance'+name));
            
            });
        
          }
        //   saving document

        // writing all finance news to news page from financeResponse array.
        for(var i=0;i<10;i=i+1){
            document.getElementById("news"+i).innerHTML = "<> news"+i;
            document.getElementById("titles"+i).innerHTML = "> "+financeResponses[i].title;
            document.getElementById("dateAndTimes"+i).innerHTML = "> "+financeResponses[i].publishedAt;
            document.getElementById("descriptions"+i).innerHTML = "> "+financeResponses[i].description;
            document.getElementById("a"+i).innerHTML = "<hr>";
            
        }
        
    }
    // if my outcome news is equal to business system enters to else if.
        else if(news1=='business'){
            document.getElementById("header").innerHTML = "BUSINESS NEWS";
  //    saving documents
  if (localStorage) {
      
    // Add an event listener for form submissions
    document.getElementById('contactForm').addEventListener('submit', function() {
      // Get the value of the name field.
      var name = document.getElementById('name').value;
                // getting number of news and saving that number of business news to local storage as a json .
                localStorage.setItem('business'+name,JSON.stringify(businessResponses[name]));


    });

  }
//   saving document

// writing all business news to screen form businessResponse array.
        for(var i=0;i<10;i=i+1){
            document.getElementById("news"+i).innerHTML = "> news"+i;
            document.getElementById("titles"+i).innerHTML = "> "+businessResponses[i].title;
            document.getElementById("dateAndTimes"+i).innerHTML = "> "+businessResponses[i].publishedAt;
            document.getElementById("descriptions"+i).innerHTML = "> "+businessResponses[i].description;
            document.getElementById("a"+i).innerHTML = "<hr>";


        }
    }
    // in else stage has exaclty same fuction like if and else if stages.
       else{
        document.getElementById("header").innerHTML = "SPORT NEWS";
  //    saving documents
  if (localStorage) {
      
    // Add an event listener for form submissions
    document.getElementById('contactForm').addEventListener('submit', function() {
      // Get the value of the name field.
      var name = document.getElementById('name').value;
      localStorage.setItem('sport'+name,JSON.stringify(responses[name]));

    });

  }
//   saving document
// writing all news on screen.
        for(var i=0;i<10;i=i+1){
            document.getElementById("news"+i).innerHTML = "> news"+i;
            document.getElementById("titles"+i).innerHTML = "> "+responses[i].title;
            document.getElementById("dateAndTimes"+i).innerHTML = "> "+responses[i].publishedAt;
            document.getElementById("descriptions"+i).innerHTML = "> "+responses[i].description;
            document.getElementById("a"+i).innerHTML = "<hr>";

        }
    }
}

// this function getting api response when program start. 
function updateProgram(){

    Current('finance');
    Current('sport');
    Current('business');

}

// this function used for saved data if there is any saved data it shows data on screen or if there is no data it says there is no document.
function view(){

    if (localStorage.length>0){
        // cleaning screen
        document.getElementById("header").innerHTML = "";
        document.getElementById("question").innerHTML = " ";
        document.getElementById("label").innerHTML = '';
        document.getElementById("input").innerHTML = ' ';
        document.getElementById("input2").innerHTML = '';

        for(var i=0;i<10;i=i+1){
        document.getElementById("news"+i).innerHTML = " ";
        document.getElementById("titles"+i).innerHTML = " ";
        document.getElementById("dateAndTimes"+i).innerHTML = " ";
        document.getElementById("descriptions"+i).innerHTML = " ";
        document.getElementById("a"+i).innerHTML = "";
        }
        // it adding clear button which use for clear all local storage means deleting all data from local storage.
    document.getElementById("input").innerHTML = '  <button onclick="clearr()" align="center">  clear</button>';
    document.getElementById("header").innerHTML = "SAVED NEWS";
// reading all data from local storage and wring them on screen.
    for (var i = 0; i < localStorage.length; i++) {
  var name=localStorage.key(i);
        
        var res = JSON.parse(localStorage.getItem(name));
        console.log(res.title);
        console.log(res.publishedAt);
        console.log(res.description);
            document.getElementById("news"+i).innerHTML = "!! saved "+i;
            document.getElementById("titles"+i).innerHTML = "!! "+res.title;
            document.getElementById("dateAndTimes"+i).innerHTML = "!! "+res.publishedAt;
            document.getElementById("descriptions"+i).innerHTML = "!! "+res.description;
            document.getElementById("a"+i).innerHTML = "<hr>";
            }
    }
// if there is no document in localstorage else says there is no document in local storage.
    else{ 
        document.getElementById("header").innerHTML = "THERE IS NO DOCUMENT ";
        document.getElementById("question").innerHTML = " ";
        document.getElementById("label").innerHTML = '';
        document.getElementById("input").innerHTML = ' ';
        document.getElementById("input2").innerHTML = '';

        for(var i=0;i<10;i=i+1){
        document.getElementById("news"+i).innerHTML = " ";
        document.getElementById("titles"+i).innerHTML = " ";
        document.getElementById("dateAndTimes"+i).innerHTML = " ";
        document.getElementById("descriptions"+i).innerHTML = " ";
        document.getElementById("a"+i).innerHTML = "";
        }
    }
        
}

// in view function i add clear button on screen . this button colling this function to clean screen and delete all local storage.
function clearr(){

    
    for (var i = 0; i < localStorage.length; i++) {
                  document.getElementById("news"+i).innerHTML = " ";
                  document.getElementById("titles"+i).innerHTML = " ";
                  document.getElementById("dateAndTimes"+i).innerHTML = " ";
                  document.getElementById("descriptions"+i).innerHTML = " ";
                  document.getElementById("a"+i).innerHTML = "";
                  
      
      
      
      }
  

    localStorage.clear();

}
