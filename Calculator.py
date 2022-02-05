def a(x, c, y):
  x = int(input())
  c = input()
  y = int(input())
  
  sum = x + y
  sub = x - y
  mul = x * y
  div = x / y
  
  if c == "+":
    return sum
  else:
    if c == "-":
      return sub
    else:
      if c == "*":
        return mul
      else:
        if c == "/":
          return div
        else:
          return "N/A"

print(a((), (), ()))
