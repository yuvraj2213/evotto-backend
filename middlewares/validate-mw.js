const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    console.log(err)
    const message = err.errors[0]?.message || "Validation error";

    const status=402;
    // res.status(400).json({ msg: message });
    const error={
      status,
      message
    }
    next(error)
  }
};

module.exports = validate;
