# VscTerminal

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## bổ sung font

- trong src-tauri/src/models/settings.rs thêm font vào FontFamilyType, tên đầy đủ của font khi sử dụng là: "'Major Mono Display', monospace"
- trong src/app/models/setting.ts thêm font vào FONT_FAMILIES, tên font đầy đủ khi sử dụng là: "'Major Mono Display', monospace"
- vào googlefont tải file font chữ về, chỉ chọn monospace, lưu vào public/fonts
- vào src/styles.css khai báo, khai báo thì không cần ghi monospace

    ```css
    @font-face {
        font-family: 'Major Mono Display';
        src: url('/fonts/MajorMonoDisplay-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }
    ```

- Sử dụng cần ghi rõ monospace: font-family: "'Major Mono Display', monospace"

## Thêm terminal profile

- vào src-tauri\src\constansts\shell_consts.rs để thêm
