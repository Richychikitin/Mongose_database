const yup = require('yup');

const validateUserUpdate = (req, res, next) => {
  const { names, adress, date, rol, tel, mail, password, user } = req.body;

  const userSchema = yup.object().shape({
    names: yup.string(),
    adress: yup.string(),
    date: yup.date(),
    rol: yup.string().oneOf(['Admin', 'Empleado', 'Cliente']),
    tel: yup.string(),
    mail: yup.string().email(),
    password: yup.string().min(8),
    user: yup.string()
  });

  userSchema
    .validate({ names, adress, date, rol, tel, mail, password, user }, { abortEarly: false })
    .then(() => next())
    .catch(err => {
      const validationErrors = err.inner.map(e => ({ path: e.path, message: e.message }));
      res.status(400).json({ errors: validationErrors });
    });
};

module.exports = { validateUserUpdate };