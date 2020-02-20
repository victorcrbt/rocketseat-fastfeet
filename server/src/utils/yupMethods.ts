/* eslint-disable func-names, space-before-function-paren */
import * as yup from 'yup';

export default (): any => ({
  existsWithID: yup.addMethod(yup.string, 'existsWithID', function(
    model: any,
    msg: string
  ): any {
    return this.test('exists', msg, async value => {
      if (!value) return false;

      const exists = await model.findByPk(value);

      if (exists) return true;

      return false;
    });
  }),
});
