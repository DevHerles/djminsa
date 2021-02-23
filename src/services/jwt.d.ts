declare namespace jwt {
    function app(name?: string): jwt.app.App;
    function auth(app?: jwt.app.App): jwt.auth.Auth;
}

declare namespace jwt.app{
    interface App {
        aut(): jwt.auth.Auth;
    }
}

declare namespace jwt.auth{
    interface Auth {
        app: jwt.app.App;
        createUserWithEmailAndPassword(
            email: string,
            password: string
        ): Promise<jwt.auth.UserCredential>;
        currentUser: jwt.User | null;
        signInWithEmailAndPassword(
            email: string,
            password: string
        ): Promise<jwt.auth.UserCredential>;
        signInWithPhoneNumber(
            phoneNumber: string,
            applicationVerifier: jwt.auth.ApplicationVerifier
        ): Promise<jwt.auth.ConfirmationResult>;
        signOut(): Promise<void>;
        updateCurrentUser(user: jwt.User | null): Promise<void>;
    }
}

function auth(app?: jwt.app.App): jwt.auth.Auth;

function initializeApp(options: Object, name?: String): jwt.app.App;

//export jwt;
export as namespace jwt;
