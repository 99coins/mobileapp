var $_ICV = {
	init:function()
	{
		document.getElementById("ic_signupform").addEventListener("submit", $_ICV.validate);
	},
	validate:function(e)
	{	
			var div 	= document.querySelectorAll("div.formEl"),
				emailField = document.querySelectorAll('div.formEl input[name="data[email]"]')[0],
				errors 	= [];

			for(i=0;i<div.length;i++) {

				var 	required 		= (div[i].classList.contains('required')) ? true : false,
						type 			= parseInt(div[i].getAttribute('data-validation-type')),
						label			= div[i].getAttribute('data-label'),
						value 			= '',
						confirmEmail 	= false;

				try {

					if(div[i].querySelectorAll("input").length > 0){

						var input = div[i].querySelectorAll("input");

						if(input[0].type=='text') {
							value=input[0].value;

						} else if (input[0].type=='checkbox') {
							if(type==2)	{
								value = (input[0].checked) ? 1 : '';
							} else if(type==1){
								for(x=0;x<input.length;x++) if(input[x].checked) value+=input[x].checked;
							} else {
								throw "Invalid type used for checkbox. Please contact support.";
							}

						} else if (input[0].type='radio') {
							for(x=0;x<input.length;x++) value = (input[x].checked) ? input[x].value : value;

						} else {
							throw "Unknown validation error has occured. Please contact support.";
						}
						
						if (input[0].name == "data[confirmemail]") {
							confirmEmail = input[0];
						}
						
						if (input[0].name == "data[email]") {
							type = 98;
						}
									
					} 
					else if (div[i].querySelectorAll("select").length > 0 ) {
						value = div[i].querySelectorAll("select")[0].value;
					} 
					else {
						throw "Unknown validation error has occured. Please contact support.";
					}

					valid = $_ICV._validate_field(value, type);
					if(!valid && required){
						errors.push($_ICV._get_error(label, type));
						div[i].className = div[i].className.concat(" error");
					} else if(!valid && value!=''){
						errors.push($_ICV._get_error(label, type));
					}
					
					if (valid && confirmEmail && confirmEmail.value !== emailField.value) {
						errors.push($_ICV._get_error(label, 99));
					} 

				} catch(ex) {
					alert(ex);
					e.preventDefault();
					e.stopPropagation();
					return false;
				}
			}

			if(errors.length > 0) {
				alert(errors.join("\n"));
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
			return true;

	},
	_validate_field:function(value, type)
	{
		if(type==1) 														return (value!='');
		else if(type==2) 													return (value==1);
		else if(type==4) 													return value.match(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/, value);
		else if(type==3 || type==5 || type==6 || type==7 || type==8)		return this._validate_combined_numerics(value);
		else if(type==98) 													return value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, value);
		else 																return false;
	},
	_get_error:function(label, type)
	{
		if(type==1)															return "'"+label+"' field cannot be empty.";
		else if(type==2)													return "'"+label+"' field must be checked.";
		else if(type==4) 													return "'"+label+"' field has an invalid date format. MM/DD/YYYY";
		else if(type==3 || type==5 || type==6 || type==7 || type==8) 		return "'"+label+"' field must be a number. Please limit your value to 20 digits (not including any digits after the decimal).";
		else if(type==98)													return "'"+label+"' is an invalid Email Address";
		else if(type==99)													return "Email Fields Do Not Match";
		else																return 'Unknown validation error';
	},
	_validate_combined_numerics:function(value) {
		upper = value.split('.');

		if(upper=="") 									return false;
		
		if(upper.length==2) {
			if(isNaN(upper[0]) || isNaN(upper[1]))		return false;
		} else {
			if(isNaN(upper[0]))							return false;
		}
		
		if(upper[0].length > 20)						return false;
		
		return true;
	}
}
window.addEventListener("load", $_ICV.init);
