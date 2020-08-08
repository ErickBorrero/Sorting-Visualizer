import matplotlib.pyplot as plt
import matplotlib.animation as animation
import time
import random

def updateFig(x, rectangles, iteration):
    for rectangle, value in zip(rectangles, x[0]):
        rectangle.set_height(value)
        rectangle.set_color('b')
    rectangles[x[1]].set_color('r')
    iteration[0] += 1
    text.set_text("# of operations: {}".format(iteration[0]))
    

def bubbleSort(nums):
    last = len(nums)
    while last != 0:
        last -= 1
        for n in range(0, last):
            if nums[n] > nums[n+1]:
                nums[n], nums[n+1] = nums[n+1], nums[n]
                yield nums, n+1

def mergeSort(nums):
    if len(nums) <= 1:
        yield nums

    mid = len(nums) // 2
    left = mergeSort(nums[:mid])
    right = mergeSort(nums[mid:])
    
    yield left
    yield right
    yield merge(left, right)

def merge(a, b):
    merged = []
    a_index, b_index = 0, 0

    while a_index < len(a) and b_index < len(b):

        if a[a_index] < b[b_index]:
            merged.append(a[a_index])
            a_index += 1
        else:
            merged.append(b[b_index])
            b_index += 1
        
    if a_index == len(a):
        merged.extend(b[b_index:])
    else:
        merged.extend(a[a_index:])

    for i, sorted_val in enumerate(merged):
        a[i] = sorted_val
        yield a

randomArray = [random.randint(0,50) for i in range(50)]

title = 'Bubble Sort'
generator = bubbleSort(randomArray)

fig, ax = plt.subplots()
ax.set_title(title)
rectangleBars = ax.bar(range(len(randomArray)), randomArray, align='edge')
text = ax.text(0.02, 0.95, "", transform=ax.transAxes)
iteration = [0]

anim = animation.FuncAnimation(fig, 
                               func = updateFig,
                               fargs = (rectangleBars, iteration), 
                               frames = generator, 
                               interval = 1, 
                               repeat = False
                               )


plt.show()
