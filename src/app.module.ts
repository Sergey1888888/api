import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://root:A1msY8g6GMnzneiw@volgogradrealtycluster.js3zw.mongodb.net/users?retryWrites=true&w=majority`,
      { useFindAndModify: false },
    ),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
