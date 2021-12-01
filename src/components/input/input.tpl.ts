const template = `
  <input class="input" name="{{name}}" id="{{name}}" type="{{type}}" placeholder=" " required value={{value}}>
  <label for="{{name}}" class="label">{{textName}}</label>
  <div class="form__error">{{errorText}}</div>
`;

export default template;
