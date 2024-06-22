import { EscapeHtmlPipe } from './escape-html.pipe';

describe('EscapeHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new EscapeHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
