/* eslint-disable func-names, space-before-function-paren */
import * as yup from 'yup';

export default (): any => ({
  exists: yup.addMethod(yup.string, 'existsWithID', function(
    model: any,
    msg: string
  ): any {
    return this.test('exists', msg, async value => {
      const exists = await model.findByPk(value);

      if (exists) return true;

      return false;
    });
  }),
});
