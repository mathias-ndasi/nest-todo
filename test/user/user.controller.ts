// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from '../../src/service/auth.service';
// import { UserService } from '../../src/service/user.service';
// import { UserController } from '../../src/controller/user.controller';
// import { UserHelper } from '../../src/helper/user.helper';
// import { PrismaService } from '../../src/service/prisma.service';
// import { JwtStrategy } from '../../src/guard/jwt.strategy';

// describe('UserController', () => {
//   let controller: UserController;
//   let authService: AuthService;
//   let userService: UserService;
//   let userHelper: UserHelper;
//   let prismaService: PrismaService;
//   let jwtStrategy: JwtStrategy;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [
//         JwtStrategy,
//         PrismaService,
//         UserHelper,
//         UserService,
//         AuthService,
//       ],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//     userService = module.get<UserService>(UserService);
//     authService = module.get<AuthService>(AuthService);
//     userHelper = module.get<UserHelper>(UserHelper);
//     prismaService = module.get<PrismaService>(PrismaService);
//     jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
//   });

//   it('Should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   // describe('Get all accounts', () => {
//   //     it('Successfully retrieve all accounts', async () => {
//   //         const endpoint
//   //     })
//   // })
// });
