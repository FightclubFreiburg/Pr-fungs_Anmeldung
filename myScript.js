var curretAgegroup = "";

var belt_selector = document.getElementById("graduierung_selector");
var wkupassAbgegeben_div = document.getElementById("wkupassAbgegeben_div");
var tshirt_size_slector = document.getElementById("shirtSize_selector");

var email = "";


function previewImage(event) {
    const file = event.target.files[0]; // Das hochgeladene Bild
    const preview = document.getElementById('imagePreview'); // Das Bild-Element für die Vorschau

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result; // Setzt die Quelle des Bildes auf das hochgeladene Bild
            preview.style.display = 'block'; // Zeigt das Bild an

            preview.onload = function() {
                const originalWidth = preview.naturalWidth;
                const originalHeight = preview.naturalHeight;
    
                // Verhältnis zwischen Breite und Höhe berechnen
                const aspectRatio = originalWidth / originalHeight;
    
                // Die Höhe bleibt gleich, die Breite wird im Verhältnis angepasst
                preview.style.width = (preview.height * aspectRatio) + 'px';
            }        
        };
         
        reader.readAsDataURL(file); // Liest die Datei und wandelt sie in eine URL um
    }
}

document.getElementById("anmeldungsFormular").addEventListener("submit", async function(event){
    event.preventDefault();

    if(belt_selector.value == "") {
        alert("Bitte wähle eine Graduierung aus.");
        return;
    }
    if(!wkupassAbgegeben_div.classList.contains("none") && event.target.wkupassAbgegeben.value == "") {
        alert("Hast du deinen WKU Pass schon abgegeben ?");
        return;
    }
    if(tshirt_size_slector.selectedIndex == 0 && event.target.shirtwahl.value == "Ja"){
        alert("Bitte wähle eine T-Shirt größe aus.");
        return;
    }


    const fileInput = null;//event.target.photo.files[0];
    const reader = new FileReader();

    console.log(event.target.gürtelwahl.selectedIndex);

    if(fileInput == null){

        // Daten für den JSON-Body
        const data = {
            vorname: event.target.firstName.value,
            nachname: event.target.lastName.value,

            geburtstag: event.target.birthday.value,
            sportart: event.target.category.value,
            graduierung: event.target.graduation.value,

            will_gürtel: event.target.gürtelwahl.value,

            //wkupassAbgegeben: event.target.graduation.value == "Weiß-Gelb" && event.target.category.value == "Budo Kids" ? "Erste Prüfung" : event.target.graduation.value == "Gelb" ? "Erste Prüfung" : event.target.wkupassAbgegeben.value,
	    besitzt_wku_pass: event.target.wkupassAbgegeben.value,
		
            standort: event.target.standort.value,

            telefonnummer: event.target.telefonnummer.value,
            adresse: event.target.adresse.value,
            platz: event.target.platz.value,
            ort: event.target.ort.value,

            Tshirt: event.target.category.value == "Budo Kids" ? event.target.shirtwahl.value == "Ja" ? event.target.shirtSize.value : event.target.shirtwahl.value : "",

            email: event.target.email.value,
		
            photo: "",
            mimeType: "",

            einverständniss: event.target.consent.value
        };

        var url = "";

        if(curretAgegroup == "") {
            alert("Eingabe Fehler: Alter muss angegeben sein!");
            return;
        }
	
	url = "https://hooks.zapier.com/hooks/catch/22925597/2727n9o/";
	
	
	const form = event.target; 
	const formData = new FormData(form);
	
        try {
            const response = await fetch(url, {
                method: 'POST',
                /*headers: {
                    'Content-Type': 'application/json'
                },*/
                //body: JSON.stringify(data)
		body: data
            });

            if(response.ok) {
                alert("Formular erfolgreich übermittelt!");

                // Clear the form here
                document.getElementById("anmeldungsFormular").reset();

                location.reload();
            } else {
                const errorData = await response.json();
                alert("Fehler bei der Übermittlung: " + JSON.stringify(errorData));
            }
        } catch (error) {
            alert("Fehler bei der Übermittlung: " + error.message);
        }
    }
    else 
    {
        reader.onloadend = async function() {
            // Datei in Base64 konvertieren
            const base64String = reader.result.split(',')[1]; 
            // MIME-Typ der Datei erfassen
            const mimeType = fileInput.type;
            
            // Daten für den JSON-Body
            const data = {
	    	vorname: event.target.firstName.value,
         	nachname: event.target.lastName.value,

            	geburtstag: event.target.birthday.value,
            	sportart: event.target.category.value,
            	graduierung: event.target.graduation.value,

            	will_gürtel: event.target.gürtelwahl.value,

            	//wkupassAbgegeben: event.target.graduation.value == "Weiß-Gelb" && event.target.category.value == "Budo Kids" ? "Erste Prüfung" : event.target.graduation.value == "Gelb" ? "Erste Prüfung" : event.target.wkupassAbgegeben.value,
	    	besitzt_wku_pass: event.target.wkupassAbgegeben.value,
		
            	standort: event.target.standort.value,

            	telefonnummer: event.target.telefonnummer.value,
            	adresse: event.target.adresse.value,
            	platz: event.target.platz.value,
            	ort: event.target.ort.value,

            	Tshirt: event.target.category.value == "Budo Kids" ? event.target.shirtwahl.value == "Ja" ? event.target.shirtSize.value : event.target.shirtwahl.value : "",

            	email: event.target.email.value,
		    
                photo: base64String,
                mimeType: mimeType,
    
                einverständniss: event.target.consent.value
            };
    
    
            var url = "";
    
            if(curretAgegroup == "") {
                alert("Eingabe Fehler: Alter muss angegeben sein!");
                return;
            }
    
            if(curretAgegroup == "Budo Kids") url = "https://prod-41.westeurope.logic.azure.com:443/workflows/b893d6f927674005b07ad52158417578/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o-k6wknDrG9_ZJq5PSH_cQLpQ3w6DPmu35gwxvKqh9g";
            else url = "https://prod-41.westeurope.logic.azure.com:443/workflows/b893d6f927674005b07ad52158417578/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o-k6wknDrG9_ZJq5PSH_cQLpQ3w6DPmu35gwxvKqh9g";
    
    
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if(response.ok) {
                    alert("Formular erfolgreich übermittelt!");
    
                    // Clear the form here
                    document.getElementById("anmeldungsFormular").reset();
    
                    location.reload();
                } else {
                    const errorData = await response.json();
                    alert("Fehler bei der Übermittlung: " + JSON.stringify(errorData));
                }
            } catch (error) {
                alert("Fehler bei der Übermittlung: " + error.message);
            }
        };
    
        // Lese die Datei als Data-URL (Base64)
        reader.readAsDataURL(fileInput);
    }

    
});


window.onload = function(){
    callAlterseingabeWithCurrentValue();

    //Email Parameter aus der URL übernommen
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('email') == null)
    {
        email = "elias.ehret@fightclub-freiburg.de";
        console.log("No Email found! An error message will be send to 'elias.ehret@fightclub-freiburg.de'");
    }
    else{
        email = urlParams.get("email");
        console.log(email);
    }
}
function callAlterseingabeWithCurrentValue(){
    //sogrt dafür, dass richtige Beltstufen zur auswahl dastehen
    alterEingabe(document.getElementById("birthday").value);

    //checked ob bei shirtwahl ja oder nein angekreuzt ist und dis- / enabled shirtsize selector 
    var shirtwahl_toggles = document.getElementsByName("shirtwahl");
    for (let i = 0; i < shirtwahl_toggles.length; i++) {
        if(shirtwahl_toggles[i].checked){
            shirtSizeDisplay(shirtwahl_toggles[i].value);
        }
    }
    
}

function alterEingabe(input){
    console.log(input);

    var alter = getAlter(input);
     
    if(alter < 10){
        setAltersgruppe("Budo Kids");
    }
    else if(alter >= 10 && alter < 16){
        setAltersgruppe("Jugendlich");
    }
    else if(alter >= 16 && alter < 18){
        setAltersgruppe("Jugendlich 2");
    }
    else if(alter >= 18){
        setAltersgruppe("Erwachsen");
    }
}

function getAlter(input){
    var geburtstag = new Date(input);
    var heute = new Date();

    var alter = heute.getFullYear() - geburtstag.getFullYear();
    var monatsDifferenz = heute.getMonth() - geburtstag.getMonth();

    // Überprüfen, ob der Geburtstag in diesem Jahr noch nicht war
    if (monatsDifferenz < 0 || (monatsDifferenz === 0 && heute.getDate() < geburtstag.getDate())) {
        alter--;
    }

    return alter;
}


function setAltersgruppe(Altersgruppe){

    curretAgegroup = Altersgruppe;

    if(Altersgruppe == "Budo Kids"){
        setBeltSteps("Budo Kids");
    }
    else if(Altersgruppe == "Jugendlich"){
        setBeltSteps("Jugendlich");
    }
    else if(Altersgruppe == "Jugendlich 2"){
        setBeltSteps("Jugendlich 2");
    }
    else if(Altersgruppe == "Erwachsen"){
        setBeltSteps("Erwachsen");
    }
}

function setBeltSteps(altersgruppe){
    console.log(altersgruppe);
    
    var sportart_selector = document.getElementById("sportart_selector");
    var shirt_div = document.getElementById("T-Shirt_div");

    belt_selector.options.length = 0;
    
    if(altersgruppe == "Budo Kids")
    {
        //create empty selection slot befor the others
        const newOption = document.createElement('option');
        newOption.value = "";
        newOption.disabled = true;
        newOption.selected = true;
        newOption.textContent = "Bitte auswählen";
        belt_selector.insertBefore(newOption, belt_selector.firstChild);

        belt_selector.add(new Option("Weiß-Gelb"));
        belt_selector.add(new Option("Gelb"));
        belt_selector.add(new Option("Gelb-Orange"));
        belt_selector.add(new Option("Orange"));
	belt_selector.add(new Option("Orange-Grün"));
        belt_selector.add(new Option("Grün"));

        //delete all options with the value "Budo Kids"
        for (let i = sportart_selector.length - 1; i >= 0; i--) {
            if (sportart_selector[i].value === "Budo Kids") {
                sportart_selector[i].remove();
            }
        }
        sportart_selector.add(new Option("Budo Kids"));
        sportart_selector.value = "Budo Kids";
        sportart_selector.disabled = true;

        shirt_div.classList.remove("none");
    }
    else 
    {
        //delete all options with the value "Budo Kids"
        for (let i = sportart_selector.length - 1; i >= 0; i--) {
            if (sportart_selector[i].value === "Budo Kids") {
                sportart_selector[i].remove();
            }
        }

        sportart_selector.disabled = false;
        shirt_div.classList.add("none");

        //set T-shirt to Nein
        shirt_div.children[4].children[0].checked = true;


        if(altersgruppe == "Erwachsen")
        {
            belt_selector.add(new Option("Gelb"));
            belt_selector.add(new Option("Orange"));
            belt_selector.add(new Option("Grün"));
            belt_selector.add(new Option("Blau"));
        }
        else 
        {
            if(sportart_selector.value == "Kickboxen"){
            
                if(altersgruppe == "Jugendlich")
                {
                    belt_selector.add(new Option("Gelb"));
                    belt_selector.add(new Option("Orange"));
                    belt_selector.add(new Option("Grün 1"));
                    belt_selector.add(new Option("Grün 2"));
                    belt_selector.add(new Option("Blau 1"));
                    belt_selector.add(new Option("Blau 2"));
                }
                else if(altersgruppe == "Jugendlich 2")
                {
                    belt_selector.add(new Option("Gelb"));
                    belt_selector.add(new Option("Orange"));
                    belt_selector.add(new Option("Grün"));
                    belt_selector.add(new Option("Blau 1"));
                    belt_selector.add(new Option("Blau 2"));
                }
            }
            else if(sportart_selector.value == "Jiu Jitsu")
            {
                belt_selector.add(new Option("Gelb"));
                belt_selector.add(new Option("Orange"));
                belt_selector.add(new Option("Grün"));
                belt_selector.add(new Option("Blau"));
            }
        }
        

        //create empty selection slot befor the others
        const newOption = document.createElement('option');
        newOption.value = "";
        newOption.disabled = true;
        newOption.selected = true;
        newOption.textContent = "Bitte auswählen";
        belt_selector.insertBefore(newOption, belt_selector.firstChild);
    }

}

function selectGraduation(selected_graduation){

	/*
    //enable / disable WKU Pass Abgabe feld
    if(selected_graduation.selectedIndex == 1)
    {
        wkupassAbgegeben_div.classList.add("none");
    }
    else
    {
        wkupassAbgegeben_div.classList.remove("none");
    }
    */
    var gebührFeld = document.getElementById("Gebühr");

    //Calculate cost
    if(selected_graduation.value == "Weiß-Gelb") gebührFeld.innerHTML = "20";
    else if(selected_graduation.value == "Gelb") gebührFeld.innerHTML = "25";
    else if(selected_graduation.value == "Gelb-Orange") gebührFeld.innerHTML = "25";
    else if(selected_graduation.value == "Orange") gebührFeld.innerHTML = "30";
    else if(selected_graduation.value == "Orange-Grün") gebührFeld.innerHTML = "30";
    else if(selected_graduation.value == "Grün" || selected_graduation.value == "Grün 1") gebührFeld.innerHTML = "35";
    else if(selected_graduation.value == "Grün 2") gebührFeld.innerHTML = "0";
    else if(selected_graduation.value == "Grün-Blau") gebührFeld.innerHTML = "35";
    else if(selected_graduation.value == "Blau" || selected_graduation.value == "Blau 1") gebührFeld.innerHTML = "40";
    else if(selected_graduation.value == "Blau 2") gebührFeld.innerHTML = "0";
    
}

function shirtSizeDisplay(input){
    var shirtSizeDisplay = document.getElementById("shirtSizeDisplay");

    console.log(input);

    if(input == "Ja"){
        shirtSizeDisplay.classList.remove("none");
    }else{
        shirtSizeDisplay.classList.add("none");
    }
}

function changeWKUPassAbgegebenValue(value){
    const newPassSection = document.getElementById("NewPassSection");

    if(value == "Nein"){
        newPassSection.classList.remove("none");
    }
    else{
        newPassSection.classList.add("none");
    }
}
