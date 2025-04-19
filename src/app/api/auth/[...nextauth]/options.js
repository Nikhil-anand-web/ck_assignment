import db from "@/utils/db"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const res = await db.user.findFirst({
        where: {
          googleJti: user.id
        }
      })
      



      if (!res) {
        const res = await db.user.create({
          data: {
            googleJti: user.id,
            fullName: user.name,
            picture: [{url:user.image}],
            role: 3,
            status: 1,
            email: user.email,
            cart: {
              create: {

              }
            }


          }
        })
        user.role = res.role
        user._id = res.id

       

      }else{
        user.role = res.role
        user._id = res.id
      }
    



      return true
    },
    async jwt({ token, user }) {
   

      if (user) {
        token.id = user.id; // Add custom user data to JWT
        token.role = user.role
        token._id = user._id

      }
     
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Attach custom data to session
      session.user.role = token.role
      session.user._id = token._id
      
      return session;
    },
  },
  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Using JWT for session management
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret key for JWT
}
