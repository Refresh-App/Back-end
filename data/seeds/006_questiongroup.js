require('dotenv').config()
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('question_groups').del()
    .then(function () {

      // Sqlite 3 does not support Int[]
      const questions = process.env.DB_ENV === 'staging' 
      || process.env.DB_ENV === 'production'
      ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      : '[1,2,3,4,5,6,7,8,9,10]'
      
      console.log(process.env.NODE_ENV)

      return knex('question_groups').insert([
        {group: 'onboarding', question_ids: questions}
       
      ]);
    });
};

