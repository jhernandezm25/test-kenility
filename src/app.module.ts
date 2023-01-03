import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb://root:password@localhost:27017/?authMechanism=DEFAULT'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
