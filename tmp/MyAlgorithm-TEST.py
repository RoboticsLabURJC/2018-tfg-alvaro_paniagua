if __name__ == "__main__":
    myRobot = PiBot.dameRobot()
    dis = None


    myRobot.avanzar(0.1)
    myRobot.girarDerecha(0.35)
    while True:
        time.sleep(0.15)
        dis = myRobot.leerUltrasonido()

        print (dis)
