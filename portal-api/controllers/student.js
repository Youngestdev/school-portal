const StudentModel = require("../model/studentSchema");

exports.listDetails = (req, res) => {

  StudentModel.find({regno: req.params.regno}).then(
    student => {
      res.json(student);
    }
  )
    .catch(err => {
      console.log(err);
      res.status(422).send(err.errors);
    });

};

exports.get = (req, res) => {
  StudentModel.findById(req.params.id).exec((err, student) => {
    if (err) res.status(404).send(err);
    res.json(student)
  })
};

exports.create = (req, res) => {
  const student = new StudentModel(req.body);
  student.save()
    .then(student => {
      res.json('Item added successfully');
    })
    .catch(err => {
      res.status(400).send("Unable to create new item");
    });
};

// My head is too hot. Let's someone help sef :grin:
// exports.update = (req, res) => {
//   StudentModel.updateOne({_id: req.params.id}, {
//     $set:
//       {
//         title: req.body.title,
//         address: req.body.address,
//         neighborhood: req.body.neighborhood,
//         date: req.body.date
//       }
//   }).then(student => {
//     res.json("Item updated successfully");
//   })
//     .catch(err => {
//       res.status(400).send("Unable to update item.")
//     });
// };

exports.delete = (req, res) => {
  StudentModel.findByIdAndRemove({_id: req.params.id}).then(student => {
    res.json("Item deleted successfully");
  })
    .catch(err => {
      res.status(400).send("Unable to delete item");
    });
};
