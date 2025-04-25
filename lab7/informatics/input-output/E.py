v = int(input())
t = int(input())

distance = (v * t) % 109

result = distance if distance >= 0 else 109 + distance

print(result)
