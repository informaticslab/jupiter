var builder = {
	"labeltypes":[
		"SurveillanceSystem",
		"Program",
		"Tag",
		"Organization",
		"DataStandard",
		"Collaborative",
		"System",
		"HealthSurvey",
		"Registry",
		"Dataset",
		"Tool"
	],
	"searchFields":[
		"name",
		"fullname",
		"contractphone",
		"mission",
		"contractname",
		"shortName",
		"purpose",
		"description"
	]
}

for (var i = 0, len = builder.labeltypes.length, output = ""; i < len; i++) { 
    for (var j = 0, jlen = builder.searchFields.length; j < jlen; j++)
    {
    	output= output + 'create index on :' + builder.labeltypes[i] + '(' + builder.searchFields[j] + ');\n';
    }
}

console.log(output);
