import { body } from 'express-validator';

const createProductoValidator = [
  body('codigo')
    .trim()
    .notEmpty()
    .withMessage('El código es obligatorio')
    .isLength({ min: 3, max: 10 })
    .withMessage('El código debe tener entre 3 y 10 caracteres')
    .matches(/^[A-Z0-9]+$/)
    .withMessage('El código solo puede contener letras mayúsculas y números'),
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('El nombre del producto es obligatorio')
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),
  body('categoria')
    .notEmpty()
    .withMessage('La categoría es obligatoria')
    .isIn(['Informática', 'Accesorios', 'Monitores', 'Periféricos'])
    .withMessage('La categoría seleccionada no es válida'),
  body('precio')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),
  body('stock')
    .notEmpty()
    .withMessage('El stock es obligatorio')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),
];

export default createProductoValidator;
