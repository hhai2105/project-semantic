f = open("../dataset/CS514/lecture01.pdf", "rb")
fp = open("./test.pdf", "wb")
data = f.read(1)
while data:
    fp.write(data)
    data = f.read(1)
