import matplotlib.pyplot as plt
import matplotlib.animation as animation
import time
import random

def updatefig(x, rectangles, iteration):
    for rectangle, value in zip(rectangles, x):
        rectangle.set_height(value)
        rectangle.set_color('b')
    #rectangle_bars[x[1]].set_color('r')
    iteration[0] += 1
    text.set_text("# of operations: {}".format(iteration[0]))

def bubble_sort(nums):
    last = len(nums)
    while last != 0:
        last -= 1
        for n in range(0, last):
            if nums[n] > nums[n+1]:
                nums[n], nums[n+1] = nums[n+1], nums[n]
                yield nums, n+1

#def mergesort(A, start, end):
#    """Merge sort."""

#    if end <= start:
#        return

#    mid = start + ((end - start + 1) // 2) - 1
#    mergesort(A, start, mid)
#    mergesort(A, mid + 1, end)
#    merge(A, start, mid, end)
#    yield A

#def merge(A, start, mid, end):
#    """Helper function for merge sort."""
    
#    merged = []
#    leftIdx = start
#    rightIdx = mid + 1

#    while leftIdx <= mid and rightIdx <= end:
#        if A[leftIdx] < A[rightIdx]:
#            merged.append(A[leftIdx])
#            leftIdx += 1
#        else:
#            merged.append(A[rightIdx])
#            rightIdx += 1

#    while leftIdx <= mid:
#        merged.append(A[leftIdx])
#        leftIdx += 1

#    while rightIdx <= end:
#        merged.append(A[rightIdx])
#        rightIdx += 1

#    for i, sorted_val in enumerate(merged):
#        A[start + i] = sorted_val
#        yield A


def merge_sort(nums):
    if len(nums) <= 1:
        yield nums

    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])
    
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

x = [random.randint(0,50) for i in range(50)]

title = 'Bubble Sort'
generator = mergesort(x, 0, len(x)-1)

fig, ax = plt.subplots()
ax.set_title(title)
rectangle_bars = ax.bar(range(len(x)), x, align='edge')
text = ax.text(0.02, 0.95, "", transform=ax.transAxes)

iteration = [0]
anim = animation.FuncAnimation(fig, 
                               func=updatefig, 
                               fargs = (rectangle_bars, iteration), 
                               frames = generator, 
                               interval = 1, 
                               repeat= False)

plt.show()
