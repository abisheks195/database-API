var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

AuthorSchema.virtual('name').get(function (){
  return (this.family_name + ', ' + this.first_name);
});

AuthorSchema.virtual('lifespan').get(function (){
  date_of_birth = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
  date_of_death = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
  
  if (date_of_birth!='' && date_of_death!='') {return `${date_of_birth} - ${date_of_death}`;}
  else if (date_of_birth=='' && date_of_death!='') {return `Unknown - ${date_of_death}`;}
  else if (date_of_birth!='' && date_of_death=='') {return `${date_of_birth} - Unknown`;}
  else if (date_of_birth=='' && date_of_death=='') {return '';}
});

AuthorSchema.virtual('url').get(function (){
  return '/catalog/author/' + this._id;
});


module.exports = mongoose.model('Author', AuthorSchema);