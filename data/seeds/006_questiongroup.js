require('dotenv').config()
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('question_groups').del()
    .then(function () {
      // Inserts seed entries
      const questions = process.env.DB_ENV === 'test' 
      || process.env.DB_ENV === 'development'
      ? '[1,2,3,4,5,6,7,8,9,10]'
      : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      console.log(questions)
      
      return knex('question_groups').insert([
        {group: 'onboarding', question_ids: questions}
       
      ]);
    });
};

