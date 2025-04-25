n = int(input())
arr = list(map(int, input().split()))

result = [str(x) for x in arr if x % 2 == 0]
print(' '.join(result))
