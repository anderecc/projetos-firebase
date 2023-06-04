import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="pt-BR">
            <Head>
                <script
                    type="text/javascript"
                    src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
                ></script>
                <script
                    type="text/javascript"
                    src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
                ></script>
                <script
                    type="text/javascript"
                    src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"
                ></script>
                <script
                    type="text/javascript"
                    src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
