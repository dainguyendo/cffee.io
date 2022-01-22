import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Text } from "ui";
import { fullBleed, FullBleedLayout } from "../ui/FullBleedLayout";
import { Hero } from "../ui/Hero";

export default function Web() {
  const { data: session, status } = useSession();

  return (
    <>
      <FullBleedLayout>
        <nav>
          ☕
          {!session && (
            <>
              <span>You are not signed in</span>
              <a
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                />
              )}
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </nav>
        <Hero className="full-bleed" />
      </FullBleedLayout>
    </>
  );
}
