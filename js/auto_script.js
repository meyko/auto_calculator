jQuery(document).ready(function(){
    jQuery(".auto_calc").show();

    /***********visual part**************************/

    jQuery('.carTab').removeClass('active');

    var type = 'car';
    jQuery('input[name="type"]').prop('checked', false);
    hideShow(type);

    jQuery('input[value="'+type+'"]').prop('checked', true).parent().addClass('active');

    function hideShow(type) {

        if(type == 'electric' || type == 'moto' || type == 'truck' || type == 'bus')
         {  jQuery("td:nth-child(3)").hide();
            jQuery("tr:nth-child(1)").hide();}
     else { jQuery("td:nth-child(3)").show();
            jQuery("tr:nth-child(1)").show(); }

     if(type == 'electric' || type == 'moto'){ 
        jQuery('#row_fuel').slideUp();
    } else {
        jQuery('#row_fuel').slideDown();
    }



    if(type == 'electric'||type == 'moto'){ 
        jQuery('#row_age').slideUp();
    } else {
        jQuery('#row_age').slideDown();
       
    }

    if(type == 'electric'){ 
        jQuery('#row_engine').slideUp();
    } else {
        jQuery('#row_engine').slideDown();
    }

    jQuery("#age option").hide();
    jQuery("#row_weight").hide();
    
     switch (type){
        case 'bus':
        jQuery(".bus").show();
        jQuery(".bus").first().prop('selected', true);
        break;
        case 'car':
        jQuery(".auto").show();
        jQuery(".auto").first().prop('selected', true);
        break;
        case 'truck':
        jQuery(".truck").show();
        jQuery(".truck").first().prop('selected', true);
        jQuery("#row_weight").show();
        break;

    }
}

jQuery('.carTab').on('click', function(){
    jQuery(".result").addClass("hidden");
    jQuery('.carTab').removeClass('active');

    var input = jQuery(this).find('input[name="type"]');
    var type = input.val();
    jQuery('input[name="type"]').prop('checked', false);
    input.prop('checked', true);
    hideShow(type);

    jQuery(this).addClass('active');
});

/*****************calculation****************************************/

var tarrifs = {0:{
    1:{'0-1000':0.102,'1000-1500':0.063,'1500-2200':0.267,'2200-3000':0.276,'3000':2.209},
    2:{'0-1499':0.103,'1500-2499':0.327,'2500':2.209}
},
1:{
 1:{'0-1000':1.094,'1000-1500':1.367,'1500-2200':1.643,'2200-3000':2.213,'3000':3.329},
 2:{'0-1500':1.367,'1500-2500':1.923,'2500':2.779}
},

2:{
    1:{'0-1000':1.438,'1000-1500':1.761,'1500-2200':2.441,'2200':4.985},
    2:{'0-1500':1.761,'1500-2500':2.209,'2500':4.715}
}
};

var motoTarrifs = {'0-500':0.062,'500-800':0.443,'800':0.447};

var busTarrifs = {0:{
    1:{'0':0.003},
    2:{'0':0.003}
},
1:{
 1:{'0':0.007},
 2:{'0-2500':0.007,'2500-5000':0.003,'5000':0.007}
},

2:{
   1:{'0':0.35},
   2:{'0-2500':0.35,'2500-5000':0.15,'5000':0.35}
}
};

var truckTarrifs = {
2:{
   0:{'0-5':0.01,'5-20':0.013,'20':0.016},
   1:{'0-5':0.02,'5-20':0.026,'20':0.033},
   3:{'0-5':0.8,'5-20':1.04,'20':1.32},
   2:{'0-5':1,'5-20':1.3,'20':1.65}
},

1:{
   0:{'0-5':0.01,'5':0.02},
   1:{'0-5':0.013,'5':0.026},
   3:{'0-5':0.52,'5':1.04},
   2:{'0-5':0.65,'5':1.3}
}
   
};




jQuery("#calc_btn").click(function(){
    jQuery(".result").removeClass("hidden");
    var type = jQuery(".carTab.active input").val();
    var cost = jQuery("#cost").val();
    var engine = jQuery("#engine").val()*1000;
    var ob = jQuery("#ob").val();
    var age=jQuery("#age").val();
    var weight = jQuery("#weight").val();



    var poshlina = cost/100*10;






    switch(type){
        case 'car':
        var currentTarif=tarrifs[age][ob];
        var akciz = calcAkciz(currentTarif,engine);
        var nds = (+cost+poshlina+akciz)*0.2;
        var summ = poshlina+akciz+nds;
        var currentTarif=tarrifs[0][ob];
        var newAkciz = calcAkciz(currentTarif,engine);
        var newNds = (+cost+poshlina+newAkciz)*0.2;
        var newSumm = poshlina+newAkciz+newNds;
        jQuery('#poshlina, #akciz, #nds').show();
        break;
        case 'electric':
        nds = cost*0.2;
        var summ = nds;
        jQuery('#poshlina, #akciz').hide();
        jQuery('#nds').show();
        break;
        case 'moto':
        var akciz = calcAkciz(motoTarrifs,engine);
        var nds = (+cost+poshlina+akciz)*0.2;
        var summ = poshlina+akciz+nds;
        jQuery('#poshlina, #akciz, #nds').show();

        break;
        case 'bus':
   
        
        var currentTarif=busTarrifs[age][ob];
        var akciz = calcAkciz(currentTarif,engine);
        var nds = (+cost+poshlina+akciz)*0.2;
        var summ = poshlina+akciz+nds;
        break;
        case 'truck':
        
             var currentTarif = truckTarrifs[ob][age];
              var akciz = calcAkciz(currentTarif,weight,engine);
             var nds = (+cost+poshlina+akciz)*0.2;
             var summ = poshlina+nds+akciz;
             jQuery('#poshlina, #akciz, #nds').show();
        break;

    }


    if (poshlina!=undefined)
        jQuery("#poshlina td:eq(1)").text(poshlina.toFixed(2).replace(".",","));
    if (akciz!=undefined)
        jQuery("#akciz td:eq(1)").text(akciz.toFixed(2).replace(".",","));
    if (nds!=undefined)
        jQuery("#nds td:eq(1)").text(nds.toFixed(2).replace(".",","));
    if(summ!=undefined)
        jQuery("#summ td:eq(1)").text(summ.toFixed(2).replace(".",","));
    if (type=='car'){
        jQuery("#vp2").text(poshlina.toFixed(2).replace(".",","));
        jQuery("#akciz2").text(newAkciz.toFixed(2).replace(".",","));
        jQuery("#nds2").text(newNds.toFixed(2).replace(".",","));
        jQuery("#sp2").text(newSumm.toFixed(2).replace(".",","));
    }
    return false;
});

function calcAkciz(currentTarif,searchEle,engine){
    if (engine==undefined)
        engine=searchEle;
    var interval;
    for (property in currentTarif){
        interval = property.split('-');
        if (searchEle>interval[0]&&(searchEle<=interval[1]||interval[1]==undefined)){
         return currentTarif[property]*engine;          
     }



 }
}


});