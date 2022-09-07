var P=[];
var myloc;
$(document).ready(function(){


	// forma dimiourgias xristi
	$("#frm1").submit(function(res){
		event.preventDefault();
		
		$.post("/insertuser",$("#frm1").serialize(),function(res){
			if(res==1) {
				$("#error").html("<b>Η εγγραφή σας έγινε.</b>");
			}
			else
			{
				$("#error").html("<b>Λάθος στην εγγραφή. Μάλλον υπάρχει το ίδιο username.</b>");
			}
			
		});




	});
	
	// forma gia syndesi xristi
	$("#frm2").submit(function(res){
		event.preventDefault();
		
		$.post("/login2",$("#frm2").serialize(),function(res){
			if(res==1) {
				
				window.location.href="/loginuser";
			}
			else
			{
				
				$("#error").html("<b>Λάθος username ή password.</b>");
			}
			
		});




	});
	
		// forma gia syndesi admin
	$("#frm4").submit(function(res){
		event.preventDefault();
		
		$.post("/login3",$("#frm4").serialize(),function(res){
			if(res==1) {
				
				window.location.href="/loginadmin";
			}
			else
			{
				
				$("#error").html("<b>Λάθος username ή password.</b>");
			}
			
		});




	});
	
	
	
	// forma gia apothikefsi profile
	$("#frm3").submit(function(res){
		event.preventDefault();
		
		$.post("/saveprofile",$("#frm3").serialize(),function(res){
			if(res==1) {
				
				$("#error").html("<b>Τα στοιχεία αποθηκεύτηκαν.</b>");
			}
			else
			{
				
				$("#error").html("<b>Λάθος στην αποθήκευση. Μάλλον το username που δώσατε υπάρχει</b>");
			}
			
		});
	});

	// forma gia apothikefsi profile admin
	$("#frm5").submit(function(res){
		event.preventDefault();
		
		$.post("/saveprofile2",$("#frm5").serialize(),function(res){
			if(res==1) {
				
				$("#error").html("<b>Τα στοιχεία αποθηκεύτηκαν.</b>");
			}
			else
			{
				
				$("#error").html("<b>Λάθος username ή password.</b>");
			}
			
		});




	});
	
	
		// forma gia apothikefsi profile admin
	$("#frm6").submit(function(res){
		event.preventDefault();
		$("#error").html("<b>-- Παρακαλώ περιμένετε --</b>");
		var fd=new FormData();
		var file = $('#fn')[0].files[0];
        fd.append('fn', file);
		$.ajax({
                    url: '/uploadfile',
                    type: 'post',
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function(res){
						
                        if(res =="1"){
                           $("#error").html("<b>Το αρχείο ανέβηκε</b>");
                        }
                        else{
                             $("#error").html("<b>Λάθος στο αρχείο </b>");
                        }
                    },
                });
		
		

	});
	
	
	
		// forma gia apothikefsi atomwn
	$("#frm7").submit(function(res){
		event.preventDefault();
		var url=window.location.search;  // to link tis selidas
		var prm=new URLSearchParams(url);
		
		$.post("/inskat2?pid="+prm.get("pid"),$("#frm7").serialize(),function(res){
			if(res==1) {
				
				$("#error").html("<b>Τα στοιχεία αποθηκεύτηκαν.</b>");
			}
			else
			{
				
				$("#error").html("<b>Λάθος αποθήκευση.</b>");
			}
			
		});




	});
	
			// forma gia apothikefsi thetikou test
	$("#frm8").submit(function(res){
		event.preventDefault();
				
		$.post("/setcovid2",$("#frm8").serialize(),function(res){
			if(res==1) {
				
				$("#error").html("<b>Τα στοιχεία αποθηκεύτηκαν.</b>");
			}
			if(res==2)
			{
				
				$("#error").html("<b>Λάθος αποθήκευση.</b>");
			}
			if(res==3)
			{
				
				$("#error").html("<b>Υπάρχει ήδη δηλωμένο τεστ στο διάστημα 14 ημερών.</b>");
			}
			
		});




	});
	
	
	$("#search1").keyup(function(){
		var x=$("#search1").val();
		if(x==="")
		{
			P.forEach(p=> { p.remove(); });	
		}
		else
		{
			$.getJSON("/points?cat="+x,function(res){
			P.forEach(p=> { p.remove(); });
			res.forEach(p => {  
			
					var I=["https://maps.google.com/mapfiles/kml/paddle/grn-blank.png","http://maps.google.com/mapfiles/kml/paddle/orange-blank.png","https://maps.google.com/mapfiles/kml/paddle/red-blank.png"];
					var ic;
					if(p.pp0<=32)	ic=I[0];
					if(p.pp0>32 && p.pp0<=65)	ic=I[1];
					if(p.pp0>65) ic=I[2];
					
					var Micon=L.icon({iconUrl:ic, iconSize: [30, 40],iconAnchor: [15, 39]})
					
					
					var l = L.latLng(p.lat,p.lng).distanceTo(L.latLng(myloc.lat,myloc.lng));
					
					var link1="<a href='/inpkat?pid="+p.id+"'>Καταχώρηση επίσκεψης</a>";
					if(l>5000) link1="";
					var h="<b>"+p.name+"</b><br>Εκτ. Επισκ τωρα:"+p.pp0;
					if(p.avgprs==null) p.avgprs=0;
					var h=h+" μία ώρα μετά:"+p.pp1+" δύο ώρες μετά:"+p.pp2+"<br> Μέσος όρος ατόμων δύο ώρες πριν: "+p.avgprs;
					var h=h+"<br>"+link1 ;
					
					var m=L.marker([p.lat,p.lng],{icon:Micon}).addTo(map).bindPopup(h); 
					P.push(m);
					
					});
			});
		}

		
	});



});